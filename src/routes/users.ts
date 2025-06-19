import express, { Request, Response, NextFunction }  from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '@/util/logger';
import User from '../models/User';
import { SignupRequestBody } from '../interfaces/user';
import { config } from '../config';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = User.find({});
        res.render('users', { userList: users });
    } catch (err) {
        logger.error("Error to get user list");
        res.status(500).json({ message: "Error fetching users" });
    }
});

// POST /users
router.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({msg: 'wtf'});
});

// router.post('/signup', async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
//     try {
//         const exsitingUsers = await User.findOne({ email: req.body.email }).exec();

//         if(exsitingUsers) {
//             return res.status(409).json({
//                 message: 'Email exists'
//             });
//         }

//         const hash = await bcrypt.hash(req.body.password, 10);

//         const user = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: hash,
//             isAdmin: false
//         });

//         const result = await user.save();
//         res.status(201).json({ msg: "result" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// POST /users/signup
router.post('/signup', async (req: Request<{}, {}, SignupRequestBody>, res: Response): Promise<void> => {
    try {
        const exsitingUsers = await User.find({ email: req.body.email }).exec();

        if(exsitingUsers.length > 0) {
            res.status(409).json({
                message: 'Email exists'
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: false
        });

        const result = await user.save();
        res.status(201).json({ msg: result });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });

        if(!user) {
            res.status(401).json({ message: 'User not exists'});
            return;
        }

        const isPasswordVaild = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordVaild) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id
            },
            config.jwtSecret,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Logged in successfully',
            token: token
        });
        return;
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
        return;
    }
});

export default router;
