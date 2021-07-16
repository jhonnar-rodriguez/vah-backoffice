import { combineReducers } from 'redux';
import productReducer from './product/ProductReducer';
import customerReducer from './customer/CustomerReducer';
import httpRequestReducer from './httpRequest/HttpRequestReducer';

export default combineReducers({
  productReducer,
  customerReducer,
  httpRequestReducer,
});
