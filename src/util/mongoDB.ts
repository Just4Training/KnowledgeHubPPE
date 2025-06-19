import mongoose from 'mongoose';
import { config } from '../config';

/**
 * Connect to a MongoDB database by name.
 * @param db - The database name to connect to.
 */
export async function connectMongo(db: String): Promise<void> {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log(`${db} connected.`);
    } catch (err: unknown) {
        if(err instanceof Error) {
            console.error('MongoDB connection error:', err.message);
        } else {
            console.error('Unknown error:', err);
        }
    }
}