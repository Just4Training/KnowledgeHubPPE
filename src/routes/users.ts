import express, { Request, Response, NextFunction }  from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '@/util/logger';
import User from '@/models/User';
import { getSubmissionByUser } from '@/controllers/submissionController';
import { config } from '@/config';
import { signup, login } from '@/controllers/userController';
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


// GET all submission from user
router.get('/:userId/submissions', getSubmissionByUser);

// POST /users/signup
router.post('/signup', signup);

router.post('/login', login);

export default router;
