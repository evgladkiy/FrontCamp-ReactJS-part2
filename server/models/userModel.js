import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    userName: String,
    authId: String,
    avatar: String,
    email: String,
});

export default mongoose.model('User', UserSchema);
