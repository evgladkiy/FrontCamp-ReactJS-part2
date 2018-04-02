import Immutable from 'immutable';

import toolboxReducer from './toolBoxReducer';
import { toggleFormAction, updateFilterAction } from './../actions/tweetsToolboxActions';

describe('toolbox reducer ', () => {
    const initState = Immutable.fromJS({
        shouldShowForm: false,
        filter: '',
    });

    const stateWithfilter = Immutable.fromJS({
        shouldShowForm: true,
        filter: 'Greg',
    });

    const stateShouldShowForm = Immutable.fromJS({
        shouldShowForm: true,
        filter: '',
    });

    it('should handle initial state', () => {
        expect(toolboxReducer(undefined, {})).toEqual(initState);
    });

    it('should handle TOGGLE_FORM 1', () => {
        expect(toolboxReducer(initState, toggleFormAction(true)).toJS()).toEqual({
            shouldShowForm: true,
            filter: '',
        });
    });

    it('should handle TOGGLE_FORM 2', () => {
        expect(toolboxReducer(stateShouldShowForm, toggleFormAction(false)).toJS()).toEqual({
            shouldShowForm: false,
            filter: '',
        });
    });

    it('should handle UPDATE_FILTER 1', () => {
        expect(toolboxReducer(initState, updateFilterAction('Greg')).toJS()).toEqual({
            shouldShowForm: false,
            filter: 'Greg',
        });
    });

    it('should handle UPDATE_FILTER 2', () => {
        expect(toolboxReducer(stateWithfilter, updateFilterAction('Gr')).toJS()).toEqual({
            shouldShowForm: true,
            filter: 'Gr',
        });
    });
});
