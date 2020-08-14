import {combineReducers} from 'redux';
import createReducer from './create';
import authReducer from './auth';
import dishReducer from './dish';

export default combineReducers ({
    create: createReducer,
    auth: authReducer,
    dish: dishReducer
})