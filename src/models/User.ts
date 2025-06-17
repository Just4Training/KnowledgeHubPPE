import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: { 
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: { type: Boolean },
    },
    { collection: 'user'}
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema, 'user');;

export default User;