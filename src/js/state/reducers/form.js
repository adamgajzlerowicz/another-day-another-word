const SET_INPUT = 'SET_INPUT ';
const SET_SELECT = 'SET_SELECT ';

const defaultState = { input: '', select: 'any' };

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_INPUT:
            return Object.assign({}, state, { input: action.payload });
        case SET_SELECT:
            return Object.assign({}, state, { select: action.payload });
        default:
            return state;
    }

};

const setInput = data => ({ type: SET_INPUT, payload: data });
const setSelect = data => ({ type: SET_INPUT, payload: data });

export {
    reducer, setInput, setSelect
};
