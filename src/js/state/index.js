/* global chrome */
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer as words, updateWord } from './reducers/words';
import { reducer as form } from './reducers/form';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from './chromeStorageAdapter';
import { run } from '@cycle/run';
import { createCycleMiddleware } from 'redux-cycles';
import { makeHTTPDriver } from '@cycle/http';


const cycleMiddleware = createCycleMiddleware();
const { makeActionDriver } = cycleMiddleware;

const rootReducer = compose(mergePersistedState())(combineReducers({ words, form }));

const storage = adapter(chrome.storage);
const enchancer = compose(applyMiddleware(cycleMiddleware), persistState(storage, 'redux'));

const store = createStore(rootReducer, enchancer);

let ref = null;

function main(sources) {

    const request$ = sources.ACTION
        .filter(action => {
            return action.type === 'ADD_WORD';
        })
        .map(action => {
            ref = action;
            return {
                url: 'https://words.bighugelabs.com/api/2/2907f195ac339d6cc7021a2280796049/' + action.payload.word + '/json',
                category: 'word',
            };
        });

    const action$ = sources.HTTP
        .select('word')
        .flatten()
        .map(({ text }) => {
            const resp = JSON.parse(text);
            let synonyms = null;

            switch (ref.payload.type) {
                case 'adjective':
                    synonyms = resp.adjective ? resp.adjective.syn : [];
                    break;
                case 'noun':
                    synonyms = resp.noun ? resp.noun.syn : [];
                    break;
                case 'verb':
                    synonyms = resp.verb ? resp.verb.syn : [];
                    break;
                // eslint-disable-next-line no-case-declarations
                default:
                    const verbs = resp.verb ? resp.verb.syn : [];
                    const adjective = resp.adjective ? resp.adjective.syn : [];
                    const nouns = resp.noun ? resp.noun.syn : [];
                    synonyms = adjective.concat(verbs.concat(nouns));
            }

            return updateWord({
                ...ref.payload,
                synonyms
            });
        });

    return {
        ACTION: action$,
        HTTP: request$
    };
}

run(main, {
    ACTION: makeActionDriver(),
    HTTP: makeHTTPDriver()
});


export {
    store
};


