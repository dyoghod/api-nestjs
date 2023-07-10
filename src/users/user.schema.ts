import { Schema, Document } from 'mongoose';

export interface User extends Document {
    userId: string;
    avatar?: string;
}

export const UserSchema = new Schema<User>({
    userId: String,
    avatar: String,
});