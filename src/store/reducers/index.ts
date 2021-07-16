import { combineReducers } from 'redux';
import customerReducer from './customer/CustomerReducer';
import httpRequestReducer from './httpRequest/HttpRequestReducer';

export default combineReducers({
  customerReducer,
  httpRequestReducer,
});
