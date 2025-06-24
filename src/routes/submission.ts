import express from 'express';
import { getSubmissionById, createSubmission } from '@/controllers/submissionController';

const router = express.Router();

router.get('/:submissionId', getSubmissionById);

router.post('/', createSubmission);

export default router;