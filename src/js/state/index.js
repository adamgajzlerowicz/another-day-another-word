import { combineReducers, createStore, compose } from 'redux';
import { reducer as words } from './reducers/words';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from './chromeStorageAdapter';


const rootReducer = compose(mergePersistedState())(combineReducers({ words }));


// eslint-disable-next-line no-undef
const storage = adapter(chrome.storage);
const enchancer = compose(persistState(storage, 'redux'));

const store = createStore(rootReducer, {}, enchancer);

export {
    store
};


