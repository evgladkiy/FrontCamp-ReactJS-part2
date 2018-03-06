function userMiddleware({ dispatch }) {
    return (next => (action) => {
        switch (action.type) {
            case 'USER_LOGOUT': {
                dispatch({
                    type: 'USER_LOGGED_OUT',
                    payload: false,
                });

                return fetch('http://localhost:4444/auth/logout');
            }

            case 'USER_LOGIN': {
                // dispatch({
                //     type: 'USER_LOGGED_IN',
                //     payload: true,
                // });

                return fetch('http://localhost:4444/auth/google', {
                    mode: 'no-cors', // no-cors, *same-origin

                });
            }

            default: return next(action);
        }
    });
}

export default userMiddleware;
