import { combineReducers } from 'redux';
import couponReducer from './coupon/CouponReducer';
import productReducer from './product/ProductReducer';
import customerReducer from './customer/CustomerReducer';
import categoryReducer from './category/CategoryReducer';
import navigationReducer from './navigation/NavigationReducer';
import httpRequestReducer from './httpRequest/HttpRequestReducer';
import allowedClientReducer from './allowedClient/AllowedClientReducer';

export default combineReducers({
  couponReducer,
  productReducer,
  customerReducer,
  categoryReducer,
  navigationReducer,
  httpRequestReducer,
  allowedClientReducer,
});
