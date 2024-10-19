import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    score: number;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;