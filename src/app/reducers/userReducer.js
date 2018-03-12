import Immutable from 'immutable';

const initState = Immutable.fromJS({
    userInfo: {
        userName: '',
    },
    isAuthenticated: false,
});

function userReducer(state = initState, action) {
    switch (action.type) {
        case 'AUTHENTICATE_USER': {
            if (action.payload && action.payload._id) {
                return Immutable.fromJS({
                    userInfo: action.payload,
                    isAuthenticated: true,
                });
            }

            return state;
        }


        default: return state;
    }
}

export default userReducer;
