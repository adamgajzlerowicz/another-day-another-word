import '../css/popup.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import Greeting from './popup/greeting_component.jsx';
import { store } from './state';

render(
    <Provider store={store}><Greeting/></Provider>,
    window.document.getElementById('app')
);


