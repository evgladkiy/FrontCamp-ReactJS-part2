import Immutable from 'immutable';
import lodash from 'lodash';

function tweetsReducer(state = Immutable.List(), action) {
    switch (action.type) {
        case 'TWEETS_LOADED': {
            return Immutable.fromJS(action.payload);
        }

        case 'DELETE_TWEET_FROM_STORE': {
            return state.filter(tweet => tweet.get('_id') !== action.payload);
        }

        case 'UPDATE_TWEET_IN_STORE': {
            const { id, prop, arr } = action.payload;
            const tweetIndex = state.findIndex(tweet => tweet.get('_id') === id);
            const updatedTweet = state.get(tweetIndex).set(prop, Immutable.List(arr));

            return state.set(tweetIndex, updatedTweet);
        }

        case 'UPDATE_TWEET_FROM_SERVER': {
            state.get(0).set('_id', action.payload);

            return state.shift().unshift(Immutable.fromJS(action.payload));
        }

        case 'ADD_TWEET_TO_STORE': {
            const temporaryID = String(lodash.random(0, 10000000));
            const newTweet = Object.assign({}, action.payload, { _id: temporaryID });

            return state.unshift(Immutable.fromJS(newTweet));
        }

        case 'ADD_COMMENT_TO_STORE': {
            const { comment, tweetId } = action.payload;
            const temporaryID = String(lodash.random(0, 10000000));
            const commentWithId = Object.assign({}, comment, { _id: temporaryID });

            const currentTweetIndex = state.findIndex(tweet => tweet.get('_id') === tweetId);
            const currentTweet = state.get(currentTweetIndex);
            const newCommentList = currentTweet.get('comments').push(Immutable.Map(commentWithId));
            const updatedTweet = currentTweet.set('comments', newCommentList);

            return state.set(currentTweetIndex, updatedTweet);
        }

        default: return state;
    }
}

export default tweetsReducer;
