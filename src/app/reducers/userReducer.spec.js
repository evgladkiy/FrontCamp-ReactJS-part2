import Immutable from 'immutable';

import userReducer from './userReducer';
import { authenticateUserAction } from './../actions/userActions';

describe('toolbox reducer ', () => {
    const initState = Immutable.fromJS({
        userInfo: {
            userName: '',
        },
        isAuthenticated: false,
    });

    it('should handle initial state1', () => {
        expect(userReducer(undefined, {})).toEqual(initState);
    });

    it('should handle AUTHENTICATE_USER', () => {
        expect(userReducer(initState, authenticateUserAction({
            userStatus: 'admin',
            userName: 'Gregg',
            _id: 12,
        })).toJS()).toEqual({
            userInfo: {
                userStatus: 'admin',
                userName: 'Gregg',
                _id: 12,
            },
            isAuthenticated: true,
        });
    });

    it('should handle AUTHENTICATE_USER 2', () => {
        expect(userReducer(initState, authenticateUserAction({
            userStatus: 'admin',
            userName: 'Gregg',
        }))).toEqual(initState);
    });
});
