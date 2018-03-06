import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema({
    tweetAuthor: String,
    email: String,
    tweetText: String,
    avatar: String,
    likes: [{ type: String }],
    retweets: [{ type: String }],
    tweetDate: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        commentAuthor: String,
        email: String,
        commentText: String,
        avatar: String,
        commentDate: {
            type: Date,
            default: Date.now,
        },
    }],
});

export default mongoose.model('Tweet', TweetSchema);
