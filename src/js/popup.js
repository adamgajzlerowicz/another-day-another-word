import '../css/popup.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './popup/app.jsx';
import { store } from './state';
render(
    <Provider store={store}><App/></Provider>,
    window.document.getElementById('app')
);


