export const toggleFormAction = bool => ({
    type: 'TOGGLE_FORM',
    payload: bool,
});

export const updateFilterAction = filter => ({
    type: 'UPDATE_FILTER',
    payload: filter,
});
