import { authenticateUserAction } from './../actions/userActions';

function userMiddleware({ dispatch }) {
    return (next => (action) => {
        switch (action.type) {
            case 'FETCH_USER_DATA': {
                return fetch('http://localhost:4444/auth/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin',
                })
                    .then(response => response.json())
                    .then((user) => {
                        dispatch(authenticateUserAction(user));
                    });
            }

            default: return next(action);
        }
    });
}

export default userMiddleware;
