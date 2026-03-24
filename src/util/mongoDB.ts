import mongoose from 'mongoose';
import { config } from '@/config';
import dns from 'dns';

/**
 * Connect to a MongoDB database by name.
 * @param db - The database name to connect to.
 */
export async function connectMongo(db: String): Promise<void> {
    // const cluster = encodeURIComponent("Just4Training");
    // const password = encodeURIComponent("Ws9MYsdP2dZJCDww");
    // const username = encodeURIComponent("test-user");
    // const password = encodeURIComponent("LrSIPDYFbt6RRsNU");
    // const mongoUrl = `mongodb://${username}:${password}@rainier-shard-00-00.2acin.mongodb.net:27017,
    //     rainier-shard-00-01.2acin.mongodb.net:27017,
    //     rainier-shard-00-02.2acin.mongodb.net:27017
    //     /yourDb
    //     ?ssl=true
    //     &replicaSet=atlas-xxxxx
    //     &authSource=admin
    //     &retryWrites=true
    //     &w=majority`;

    //const mongoUrl = `mongodb+srv://${username}:${password}@rainier.2acin.mongodb.net/?appName=rainier`;
    console.log(config.mongoUrl);
    try {
        dns.setDefaultResultOrder('ipv4first');
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