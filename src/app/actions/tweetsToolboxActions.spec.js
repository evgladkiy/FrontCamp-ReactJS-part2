import { toggleFormAction, updateFilterAction } from './tweetsToolboxActions';

describe('toggle form action', () => {
    it('should create an TOGGLE_FORM action 1', () => {
        expect(toggleFormAction(true)).toEqual({
            type: 'TOGGLE_FORM',
            payload: true,
        });
    });

    it('should create an TOGGLE_FORM action 2', () => {
        expect(toggleFormAction(false)).toEqual({
            type: 'TOGGLE_FORM',
            payload: false,
        });
    });
});

describe('update filter action', () => {
    it('should create an TOGGLE_FORM action 1', () => {
        expect(updateFilterAction('Joan')).toEqual({
            type: 'UPDATE_FILTER',
            payload: 'Joan',
        });
    });

    it('should create an TOGGLE_FORM action 2', () => {
        expect(updateFilterAction('')).toEqual({
            type: 'UPDATE_FILTER',
            payload: '',
        });
    });
});
