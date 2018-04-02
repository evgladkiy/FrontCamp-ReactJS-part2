import { fetchUserDataAction, authenticateUserAction } from './userActions';

describe('fetch user action', () => {
    it('should create an FETCH_USER_DATA actrion', () => {
        expect(fetchUserDataAction()).toEqual({
            type: 'FETCH_USER_DATA',
        });
    });
});

describe('authenticate user action', () => {
    const user = { userName: 'Greg' };

    it('should create an AUTHENTICATE_USER action', () => {
        expect(authenticateUserAction(user)).toEqual({
            type: 'AUTHENTICATE_USER',
            payload: user,
        });
    });
});
