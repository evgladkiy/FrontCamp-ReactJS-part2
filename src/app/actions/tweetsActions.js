export const fetchTweetsAction = () => ({
    type: 'LOAD_TWEETS',
});

export const tweetsLoadedAction = tweets => ({
    type: 'TWEETS_LOADED',
    payload: tweets,
});

export const deleteTweetAction = id => ({
    type: 'DELETE_TWEET',
    payload: id,
});

export const deleteTweetFromStoreAction = id => ({
    type: 'DELETE_TWEET_FROM_STORE',
    payload: id,
});

export const updateTweetAction = tweetData => ({
    type: 'UPDATE_TWEET',
    payload: tweetData,
});

export const updateTweetInStoreAction = tweetData => ({
    type: 'UPDATE_TWEET_IN_STORE',
    payload: tweetData,
});

export const updateTweetFromServerAction = tweet => ({
    type: 'UPDATE_TWEET_FROM_SERVER',
    payload: tweet,
});

export const addTweetAction = tweet => ({
    type: 'ADD_TWEET',
    payload: tweet,
});

export const addTweetToStoreAction = tweet => ({
    type: 'ADD_TWEET_TO_STORE',
    payload: tweet,
});

export const addCommentAction = comment => ({
    type: 'ADD_COMMENT',
    payload: comment,
});

export const addCommentToStoreAction = comment => ({
    type: 'ADD_COMMENT_TO_STORE',
    payload: comment,
});
