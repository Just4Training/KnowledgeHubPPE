import dotenv from 'dotenv';
import { mongo } from 'mongoose';

dotenv.config();

if(!process.env.PORT) {
    throw new Error('PORT is not defined in .env');
}

if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined in .env');
}

if(!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not defined in .env');
}

export const config = {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_KEY,
    mongoUrl: process.env.MONGO_URL
};