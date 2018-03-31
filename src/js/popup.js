import '../css/popup.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import Greeting from './popup/greeting_component.jsx';
import { store } from './state';

alert(JSON.stringify(store.getState()));
store.dispatch({ type: 'ADD_MESSAGE', payload: 'message' });

render(
    <Provider store={store}><Greeting/></Provider>,
    window.document.getElementById('app')
);
