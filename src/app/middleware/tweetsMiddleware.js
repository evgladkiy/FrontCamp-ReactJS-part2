import {
    tweetsLoadedAction,
    deleteTweetFromStoreAction,
    updateTweetInStoreAction,
    addTweetToStoreAction,
    updateTweetFromServerAction,
    addCommentToStoreAction,
} from './../actions/tweetsActions';

function tweetsMiddleware({ dispatch }) {
    return (next => (action) => {
        switch (action.type) {
            case 'LOAD_TWEETS': {
                return fetch('http://localhost:4444/tweets')
                    .then(response => response.json())
                    .then((tweets) => {
                        const sortedTweets = tweets.sort((a, b) => (
                            new Date(b.tweetDate) - new Date(a.tweetDate)
                        )).map((tweet) => {
                            const sortedComments = tweet.comments.sort((a, b) => (
                                new Date(a.commentDate) - new Date(b.commentDate)
                            ));
                            const mappedTweet = Object.assign({}, tweets, {
                                comments: sortedComments,
                            });

                            return mappedTweet;
                        });

                        dispatch(tweetsLoadedAction(sortedTweets));
                    });
            }

            case 'DELETE_TWEET': {
                dispatch(deleteTweetFromStoreAction(action.payload));

                return fetch(`http://localhost:4444/tweets/${action.payload}`, {
                    method: 'delete',
                });
            }

            case 'UPDATE_TWEET': {
                dispatch(updateTweetInStoreAction(action.payload));

                return fetch(`http://localhost:4444/tweets/${action.payload.id}`, {
                    method: 'put',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        [action.payload.prop]: action.payload.arr,
                    }),
                });
            }

            case 'ADD_TWEET': {
                dispatch(addTweetToStoreAction(action.payload));

                return fetch('http://localhost:4444/tweets', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(action.payload),
                })
                    .then(response => response.json())
                    .then(res => (
                        dispatch(updateTweetFromServerAction(res.tweet))
                    ));
            }
            case 'ADD_COMMENT': {
                const { comment, tweetId } = action.payload;
                dispatch(addCommentToStoreAction(action.payload));

                return fetch(`http://localhost:4444/tweets/${tweetId}`, {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comment),
                });
            }

            default: return next(action);
        }
    });
}

export default tweetsMiddleware;
