// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
