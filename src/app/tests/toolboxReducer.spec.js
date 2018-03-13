import Immutable from 'immutable';

import toolboxReducer from './../reducers/toolBoxReducer';

describe('toolbox reducer ', () => {
    const initState = Immutable.fromJS({
        shouldShowForm: false,
        filter: '',
    });

    it('should handle initial state', () => {
        expect(toolboxReducer(undefined, {})).toEqual(initState);
    });

    it('should handle TOGGLE_FORM 1', () => {
        expect(toolboxReducer(initState, {
            type: 'TOGGLE_FORM',
            payload: true,
        }).toJS()).toEqual({
            shouldShowForm: true,
            filter: '',
        });
    });

    it('should handle TOGGLE_FORM 2', () => {
        expect(toolboxReducer(Immutable.fromJS({
            shouldShowForm: true,
            filter: '',
        }), {
            type: 'TOGGLE_FORM',
            payload: false,
        }).toJS()).toEqual({
            shouldShowForm: false,
            filter: '',
        });
    });

    it('should handle UPDATE_FILTER 1', () => {
        expect(toolboxReducer(initState, {
            type: 'UPDATE_FILTER',
            payload: 'Greg',
        }).toJS()).toEqual({
            shouldShowForm: false,
            filter: 'Greg',
        });
    });

    it('should handle UPDATE_FILTER 2', () => {
        expect(toolboxReducer(Immutable.fromJS({
            shouldShowForm: true,
            filter: 'Greg',
        }), {
            type: 'UPDATE_FILTER',
            payload: 'Gr',
        }).toJS()).toEqual({
            shouldShowForm: true,
            filter: 'Gr',
        });
    });
});
