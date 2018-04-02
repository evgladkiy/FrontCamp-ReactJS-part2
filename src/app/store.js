import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

import tweetsReducer from './reducers/tweetsReducer';
import userReducer from './reducers/userReducer';
import toolboxReducer from './reducers/toolboxReducer';

import tweetsMiddleware from './middleware/tweetsMiddleware';
import userMiddleware from './middleware/userMiddleware';

installDevTools(Immutable);

export const stateToJs = state => (
    Object.keys(state)
        .reduce((acc, item) => {
            acc[item] = state[item].toJS();
            return acc;
        }, {})
);

export const objectToState = object => (
    Object.keys(object)
        .reduce((acc, item) => {
            acc[item] = Immutable.fromJS(object[item]);
            return acc;
        }, {})
);

export const configureStore = (initilaState) => {
    const appReducer = combineReducers({
        tweets: tweetsReducer,
        user: userReducer,
        toolbox: toolboxReducer,
    });

    return createStore(
        appReducer,
        objectToState(initilaState),
        applyMiddleware(
            tweetsMiddleware,
            userMiddleware,
            logger,
        ),
    );
};
