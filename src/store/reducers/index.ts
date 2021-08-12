import { combineReducers } from 'redux';
import couponReducer from './coupon/CouponReducer';
import productReducer from './product/ProductReducer';
import customerReducer from './customer/CustomerReducer';
import categoryReducer from './category/CategoryReducer';
import navigationReducer from './navigation/NavigationReducer';
import httpRequestReducer from './httpRequest/HttpRequestReducer';
import allowedClientReducer from './allowedClient/AllowedClientReducer';
import orderReducer from './general/order/OrderReducer';
import userReducer from './settings/security/user/UserReducer';
import roleReducer from './settings/security/role/RoleReducer';

export default combineReducers({
  userReducer,
  roleReducer,
  orderReducer,
  couponReducer,
  productReducer,
  customerReducer,
  categoryReducer,
  navigationReducer,
  httpRequestReducer,
  allowedClientReducer,
});
