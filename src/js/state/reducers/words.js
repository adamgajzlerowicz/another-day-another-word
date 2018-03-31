const ADD_WORD = 'ADD_WORD';
const DELETE_WORD = 'DELETE_WORD';
const CLEAR_WORDS = 'CLEAR_WORDS';
const UPDATE_WORD = 'UPDATE_WORD';

const defaultState = {};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WORD:
            return Object.assign({}, state, { [action.payload]: [] });
        case DELETE_WORD:
            const clone = Object.assign({}, state);
            return delete clone[action.payload];
        case UPDATE_WORD:
            return Object.assign({}, state, { [action.payload.word]: action.payload.synonyms });
        case CLEAR_WORDS:
            return defaultState;
        default:
            return state;
    }

};

const addWord = message => ({ type: ADD_WORD, payload: message });
const clearWords = (_) => ({ type: CLEAR_WORDS });

export {
    reducer, addWord
};
