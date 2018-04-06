import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';

import { AUTH_USER } from './actions/types';
import App from './components/App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
const API_URL = 'http://localhost:3090';

// Fetches user data if already logged in
// Storing it all in localStorage was giving strange results
if (token) {
    axios.get(`${API_URL}/getData?email=${email}`)
    .then(response => {
        store.dispatch({
            type: AUTH_USER,
            payload: response.data
        });
    });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.querySelector('.mainContainer'));
