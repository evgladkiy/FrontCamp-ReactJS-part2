import {
    tweetsLoadedAction,
    deleteTweetFromStoreAction,
    updateTweetInStoreAction,
    addTweetToStoreAction,
    updateTweetFromServerAction,
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
                        ));

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

            default: return next(action);
        }
    });
}

export default tweetsMiddleware;
