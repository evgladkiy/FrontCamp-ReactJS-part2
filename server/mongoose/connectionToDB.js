import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

import Tweet from './../models/tweetModel';

export default mongoose.connect('mongodb://localhost:27017/frontcamp', async (err) => {
    if (!err) {
        try {
            const tweetsFromDB = await Tweet.find({});
            if (tweetsFromDB.length === 0) {
                const initialData = fs.readFileSync(path.join(__dirname, './../data/initialData.json'));
                await Tweet.create(JSON.parse(initialData));
            }
            console.log('server started');
        } catch (dbError) {
            return Error('Something went wrong');
        }
    }

    return Error('Connection error');
});
