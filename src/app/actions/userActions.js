export const fetchUserDataAction = () => ({
    type: 'FETCH_USER_DATA',
});

export const authenticateUserAction = user => ({
    type: 'AUTHENTICATE_USER',
    payload: user,
});
