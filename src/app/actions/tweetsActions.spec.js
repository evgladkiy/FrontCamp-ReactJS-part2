import * as actions from './tweetsActions';

describe('fetch tweets actions', () => {
    it('should create an LOAD_TWEETS action', () => {
        expect(actions.fetchTweetsAction()).toEqual({ type: 'LOAD_TWEETS' });
    });

    const tweets = [];

    it('should create an TWEETS_LOADED action', () => {
        expect(actions.tweetsLoadedAction(tweets)).toEqual({
            type: 'TWEETS_LOADED',
            payload: tweets,
        });
    });
});

describe('delete tweet actions', () => {
    it('should create an DELETE_TWEET action', () => {
        expect(actions.deleteTweetAction(12)).toEqual({
            type: 'DELETE_TWEET',
            payload: 12,
        });
    });

    it('should create an DELETE_TWEET_FROM_STORE action', () => {
        expect(actions.deleteTweetFromStoreAction(11)).toEqual({
            type: 'DELETE_TWEET_FROM_STORE',
            payload: 11,
        });
    });
});

describe('update tweet actions', () => {
    it('should create an UPDATE_TWEET action', () => {
        expect(actions.updateTweetAction({ likes: 125 })).toEqual({
            type: 'UPDATE_TWEET',
            payload: { likes: 125 },
        });
    });

    it('should create an UPDATE_TWEET_FROM_SERVER action', () => {
        expect(actions.updateTweetFromServerAction({ likes: 125 })).toEqual({
            type: 'UPDATE_TWEET_FROM_SERVER',
            payload: { likes: 125 },
        });
    });
});

describe('add tweet actions', () => {
    it('should create an ADD_TWEET action', () => {
        expect(actions.addTweetAction({ author: 'Bill', text: 'lorem...' })).toEqual({
            type: 'ADD_TWEET',
            payload: { author: 'Bill', text: 'lorem...' },
        });
    });

    it('should create an ADD_TWEET_TO_STORE action', () => {
        expect(actions.addTweetToStoreAction({ author: 'Bill', text: 'lorem...' })).toEqual({
            type: 'ADD_TWEET_TO_STORE',
            payload: { author: 'Bill', text: 'lorem...' },
        });
    });
});

describe('add comment actions', () => {
    it('should create an ADD_COMMENTT action', () => {
        expect(actions.addCommentAction({ author: 'Joan', text: 'ipsum...' })).toEqual({
            type: 'ADD_COMMENT',
            payload: { author: 'Joan', text: 'ipsum...' },
        });
    });

    it('should create an ADD_COMMENT_TO_STORE action', () => {
        expect(actions.addCommentToStoreAction({ author: 'Joan', text: 'ipsum...' })).toEqual({
            type: 'ADD_COMMENT_TO_STORE',
            payload: { author: 'Joan', text: 'ipsum...' },
        });
    });
});
