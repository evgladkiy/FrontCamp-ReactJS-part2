import Immutable from 'immutable';

const initState = Immutable.fromJS({
    shouldShowForm: false,
    filter: '',
});

function toolboxReducer(state = initState, action) {
    switch (action.type) {
        case 'TOGGLE_FORM': {
            return state.set('shouldShowForm', action.payload);
        }

        case 'UPDATE_FILTER': {
            return state.set('filter', action.payload);
        }

        default: return state;
    }
}

export default toolboxReducer;
