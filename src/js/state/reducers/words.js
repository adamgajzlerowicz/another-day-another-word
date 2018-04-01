const ADD_WORD = 'ADD_WORD';
const DELETE_WORD = 'DELETE_WORD';
const CLEAR_WORDS = 'CLEAR_WORDS';
const UPDATE_WORD = 'UPDATE_WORD';

const defaultState = {};

const reducer = (state = defaultState, action) => {
    const clone = Object.assign({}, state);

    switch (action.type) {
        case ADD_WORD:
            return Object.assign({}, { ...state, [action.payload.word]: action.payload });
        case DELETE_WORD:
            return delete clone[action.payload];
        case UPDATE_WORD:
            return Object.assign({}, state, { [action.payload.word]: action.payload.synonyms });
        case CLEAR_WORDS:
            return defaultState;
        default:
            return state;
    }

};

const addWord = word => ({ type: ADD_WORD, payload: word });
const deleteWord = word => ({ type: DELETE_WORD, payload: word });
const updateWord = (word, synonyms) => ({ type: DELETE_WORD, payload: { word, synonyms } });

const clearWords = () => ({ type: CLEAR_WORDS });

export {
    reducer, addWord, updateWord, clearWords, deleteWord,
};
