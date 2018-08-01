import React from 'react';
import ReactDOM from 'react-dom';
import{ Provider } from 'react-redux'
import { createStore } from 'redux';
import './index.css';
import App from './components/App';

import reducers from './reducers/index';
import middleware from './middleware/index';

const store = createStore(reducers, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
