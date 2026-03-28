import { Request, Response }  from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '@/util/logger';
import User from '@/models/User';
import { config } from '@/config';

/* GET users listing. */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = User.find({});
        res.json({ users });
    } catch (err) {
        logger.error("Error to get user list");
        res.status(500).json({ message: "Error fetching users" });
    }
};

// get user by id
// const getUserById = (req: Request, res: Response) => {
//   const userId = req.params.id;
//   res.status(200).json({msg: 'wtf'});
// });

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

// Users signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if(!email || !password || !username) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email }).exec();

        if(existingUser) {
            return res.status(409).json({
                message: 'Email exists'
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hash,
            isAdmin: false
        });

        const result = await user.save();
        return res.status(201).json({ msg: result });
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User login
export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });

        if(!user) {
            return res.status(401).json({ message: 'User not exists'});
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
                isAdmin: user.isAdmin
            },
            config.jwtSecret,
            { expiresIn: '2h' }
        );

        // Set HTTP-only cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
            path: '/'
        });

        return res.status(200).json({
            message: 'Logged in successfully',
            user: {
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin || false
            }
        });
    } catch(err) {
        logger.error(err);
        res.status(500).json({
            error: err
        });
        return;
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.auth_token;
        
        if (!token) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        const decoded = jwt.verify(token, config.jwtSecret) as {
            email: string;
            userId: string;
            isAdmin?: boolean;
        };

        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            user: {
                email: user.email,
                isAdmin: user.isAdmin || false,
                username: user.username
            }
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
