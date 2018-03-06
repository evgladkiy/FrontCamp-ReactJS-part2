import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.less';

import App from './app/app';
import { configureStore } from './app/store';


const store = configureStore(window.preloadedState);
delete window.preloadedState;

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'),
);
