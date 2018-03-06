import Immutable from 'immutable';

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

                        dispatch({
                            type: 'TWEETS_LOADED',
                            payload: Immutable.fromJS(sortedTweets),
                        });
                    });
            }

            case 'DELETE_TWEET': {
                dispatch({
                    type: 'DELETE_TWEET_FROM_STORE',
                    payload: action.payload,
                });

                return fetch(`http://localhost:4444/tweets/${action.payload}`, {
                    method: 'delete',
                });
            }

            case 'UPDATE_TWEET': {
                dispatch({
                    type: 'UPDATE_TWEET_IN_STORE',
                    payload: action.payload,
                });

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
                dispatch({
                    type: 'ADD_TWEET_TO_STORE',
                    payload: action.payload,
                });

                return fetch('http://localhost:4444/tweets/', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(action.payload),
                })
                    .then(response => response.json())
                    .then(res => (
                        dispatch({
                            type: 'UPDATE_NEW_TWEET_IN_STORE',
                            payload: res.tweet,
                        })
                    ));
            }

            default: return next(action);
        }
    });
}

export default tweetsMiddleware;
