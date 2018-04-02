import Immutable from 'immutable';

import tweetsReducer from './tweetsReducer';
import {
    tweetsLoadedAction, deleteTweetFromStoreAction, updateTweetInStoreAction,
    addTweetToStoreAction, addCommentToStoreAction, updateTweetFromServerAction,
} from './../actions/tweetsActions';

describe('tweets reducer ', () => {
    const initState = Immutable.List();
    const loadedTweets = Immutable.fromJS([{
        _id: '12',
        tweetAuthor: 'Pansy Atkinson',
        email: 'pansyatkinson@verbus.com',
        tweetText: 'Lorem duis magna officia ullamco ea anim qui quis proident amet incididunt esse voluptate minim cupidatat deserunt reprehenderit magna labore qui nostrud occaecat tempor',
        tweetDate: '2017 12 20',
        likes: [],
        retweets: [],
        comments: [],
    }]);

    const newTweet = {
        _id: '14',
        tweetAuthor: 'Gregg Morisson',
        email: 'pansyatkinson@verbus.com',
        tweetText: 'untstrud occaecat tempor',
        tweetDate: '2017 12 22',
        likes: [],
        retweets: ['Volha'],
        comments: [],
    };

    it('should handle initial state', () => {
        expect(tweetsReducer(undefined, {})).toEqual(initState);
    });

    it('should handle TWEETS_LOADED', () => {
        expect(tweetsReducer(initState, tweetsLoadedAction(loadedTweets)))
            .toEqual(loadedTweets);
    });

    it('should handle UPDATE_TWEET_IN_STORE 1', () => {
        expect(tweetsReducer(loadedTweets, updateTweetInStoreAction({
            id: '12',
            arr: ['Vasia', 'Petia'],
            prop: 'likes',
        }))
            .toJS()[0])
            .toHaveProperty('likes', ['Vasia', 'Petia']);
    });

    it('should handle UPDATE_TWEET_IN_STORE 2', () => {
        expect(tweetsReducer(loadedTweets, updateTweetInStoreAction({
            id: '12',
            arr: ['Volha'],
            prop: 'retweets',
        }))
            .toJS()[0])
            .toHaveProperty('retweets', ['Volha']);
    });

    it('should handle UPDATE_TWEET_FROM_SERVER', () => {
        expect(tweetsReducer(loadedTweets, updateTweetFromServerAction(newTweet))
            .toJS()[0])
            .toEqual(newTweet);
    });

    it('should handle ADD_TWEET_TO_STORE 1', () => {
        expect(tweetsReducer(loadedTweets, addTweetToStoreAction(newTweet))
            .toJS())
            .toHaveLength(2);
    });

    it('should handle ADD_TWEET_TO_STORE 2', () => {
        expect(tweetsReducer(loadedTweets, addTweetToStoreAction(newTweet))
            .toJS()[0])
            .toHaveProperty('tweetAuthor', 'Gregg Morisson');
    });

    it('should handle ADD_COMMENT_TO_STORE 1', () => {
        expect(tweetsReducer(loadedTweets, addCommentToStoreAction({
            tweetId: '12',
            comment: {
                commentAuthor: 'Gregg Taison',
                email: 'evgladkiy@gmail.com',
                commentText: 'asdasdasd',
                commentDate: '2018 4 2',
            },
        }))
            .toJS()[0].comments)
            .toHaveLength(1);
    });

    it('should handle ADD_COMMENT_TO_STORE 2', () => {
        expect(tweetsReducer(loadedTweets, addCommentToStoreAction({
            tweetId: '12',
            comment: {
                commentAuthor: 'Gregg Taison',
                email: 'evgladkiy@gmail.com',
                commentText: 'asdasdasd',
                commentDate: '2018 4 2',
            },
        }))
            .toJS()[0].comments[0].email)
            .toBe('evgladkiy@gmail.com');
    });

    it('should handle DELETE_TWEET_FROM_STORE', () => {
        const tweets = loadedTweets.push(Immutable.fromJS(newTweet));

        expect(tweetsReducer(tweets, deleteTweetFromStoreAction('12'))
            .toJS())
            .toHaveLength(1);
    });
});
