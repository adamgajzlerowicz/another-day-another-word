const SET_INPUT = 'SET_INPUT';
const SET_SELECT = 'SET_SELECT ';
const CLEAR_FORM = 'CLEAR_FORM';

const defaultState = { input: '', select: 'any' };

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_INPUT:
            return Object.assign({}, state, { input: action.payload });
        case SET_SELECT:
            return Object.assign({}, state, { select: action.payload });
        case CLEAR_FORM:
            return defaultState;
        default:
            return state;
    }

};

const setInput = data => ({ type: SET_INPUT, payload: data });
const setSelect = data => ({ type: SET_SELECT, payload: data });
const clearForm = () => ({ type: CLEAR_FORM });

export {
    reducer, setInput, setSelect, clearForm
};
