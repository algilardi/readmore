import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    book: bookReducer
});

export default rootReducer;
