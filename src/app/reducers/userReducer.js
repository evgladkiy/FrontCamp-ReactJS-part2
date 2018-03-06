import Immutable from 'immutable';

const initState = Immutable.fromJS({
    userInfo: {
        userName: '',
    },
    isAuthenticated: false,
});

function userReducer(state = initState, action) {
    switch (action.type) {
        case 'USER_LOGGED_IN': {
            return state.set('isAuthenticated', action.payload);
        }

        case 'USER_LOGGED_OUT': {
            return state.set('isAuthenticated', action.payload);
        }

        default: return state;
    }
}

export default userReducer;
