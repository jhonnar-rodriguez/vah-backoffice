import { combineReducers } from 'redux';
import productReducer from './product/ProductReducer';
import customerReducer from './customer/CustomerReducer';
import categoryReducer from './category/CategoryReducer';
import httpRequestReducer from './httpRequest/HttpRequestReducer';

export default combineReducers({
  productReducer,
  customerReducer,
  categoryReducer,
  httpRequestReducer,
});
