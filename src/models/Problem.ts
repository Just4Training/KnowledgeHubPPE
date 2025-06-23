import mongoose, { Model, Schema, Document } from 'mongoose';
import { ProblemDifficulty } from '@/types/enums';

interface ITestCase {
    input: string;
    expectedOutPut: string;
}

export interface IProblem extends Document {
    title: String;
    description: string;
    difficulty: ProblemDifficulty;
    testCases: ITestCase[];
}

const problemSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {type: String, enum: ProblemDifficulty, required: true },
    leetcode: Number,
    testCases:[
        {
            input: { type: String, required: true },
            expectedOutput: { type: String, required: true }
        }
    ]
});

const Problem: Model<IProblem> = mongoose.model<IProblem>('Problem', problemSchema, 'problem');

export default Problem;