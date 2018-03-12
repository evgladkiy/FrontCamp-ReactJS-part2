import express from 'express';

import Tweet from './../models/tweetModel';

const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

router.get('/', asyncMiddleware(async (req, res) => {
    const tweets = await Tweet.find({});

    res.send(tweets);
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const newTweet = await Tweet.create(req.body);

    res.send(JSON.stringify({
        status: 'OK',
        tweet: newTweet,
        msg: `Atricle id - ${newTweet._id} was created`,
    }));
}));


router.put('/:id', asyncMiddleware(async (req, res) => {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body);

    res.send(JSON.stringify({
        status: 'OK',
        msg: `Tweet id - ${tweet._id} was updated`,
    }));
}));

router.post('/:id', asyncMiddleware(async (req, res) => {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, { $push: { comments: req.body } });

    res.send(JSON.stringify({
        status: 'OK',
        msg: `Comment in tweet id - ${tweet._id} was added`,
    }));
}));


router.delete('/:id', asyncMiddleware(async (req, res) => {
    const tweet = await Tweet.findByIdAndRemove(req.params.id);

    res.send(JSON.stringify({
        status: 'OK',
        msg: `Tweet id - ${tweet._id} was deleted`,
    }));
}));

export default router;
