// models/Submission.ts
import mongoose, { Schema, Document } from 'mongoose';
import { SubmissionStatus } from '@/types/enums';

export interface ISubmission extends Document {
    user: mongoose.Types.ObjectId;
    problem: mongoose.Types.ObjectId;
    code: string;
    language: string;
    result: 'Accept' | 'Wrong Answer' | 'Time Limit Exceed' | 'Runtime Error' | 'Pending';
    createdAt: Date;
}

const SubmissionSchema: Schema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    code: { type: String, required: true },
    langguage: { type: String, required: true },
    result: { type: String, enum: SubmissionStatus},
    createAt: { type: Date, default: Date.now }
}, { collection: 'test' });

const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;