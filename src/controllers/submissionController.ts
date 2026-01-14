import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import logger from '@/util/logger';
import Submission from '@/models/Submission';
import { config } from '@/config';

export const getSubmissionById = async (req: Request, res: Response) => {
    const submissionId = req.params.submissionId;

    try {
        const submission = await Submission.findById(submissionId).populate('user problem');
        if (!submission) {
            res.status(404).json({ message: 'Submission not found' });
            return;
        }

        const fullPath = path.join(config.codeSubmissionDir, submission.codeUrl);
        const code = await fs.readFile(fullPath, 'utf-8');
        res.status(200).json({ ...submission.toObject(), code });
        return;
    } catch (err) {
        logger.error('Error fetching submission by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getSubmissionByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const submissions = await Submission.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(submissions); // no code content, just metadata
        return;
    } catch (err) {
        logger.error('Error fetching submissions by user:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const getSubmissionByProblem = async (req: Request, res: Response) => {
    const problemId = req.params.problemId;

    try {
        const submissions = await Submission.find({ problem: problemId }).sort({ createdAt: -1 });
        res.status(200).json(submissions); // no code content, just metadata
        return;
    } catch (err) {
        logger.error('Error fetching submissions by problem:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}

export const createSubmission = async (req: Request, res: Response) => {
    const { user, problem, code, language } = req.body;

    if (!user || !problem || !code || !language) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    let filename = '';

    try {
        // Ensure submission directory exists
        await fs.mkdir(config.codeSubmissionDir, { recursive: true });

        // Generate unique filename
        filename = `${user}_${problem}_${Date.now()}.${language}`;
        const codeUrl = path.join(config.codeSubmissionDir, filename);

        // Write code to file
        await fs.writeFile(codeUrl, code);

        // Save metadata
        const newSubmission = new Submission({
            user,
            problem,
            codeUrl: filename,
            language,
            result: 'pending'
        });

        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
        return;
    } catch (err) {
        logger.error('Error creating submission:', err);

         // Rollback file write if DB fails
        if (filename) {
            const fullPath = path.join(config.codeSubmissionDir, filename);
            try {
                await fs.unlink(fullPath);
                logger.info(`Rolled back file: ${filename}`);
            } catch (unlinkErr) {
                logger.warn(`Failed to remove orphaned file: ${filename}`, unlinkErr);
            }
        }
        
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};