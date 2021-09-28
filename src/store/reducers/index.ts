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
import authReducer from './auth/AuthReducer';
import traceReducer from './general/trace/TraceReducer';
import reportReducer from './report/ReportReducer';
import profileReducer from './profile/ProfileReducer';
import promotionReducer from './promotion/PromotionReducer';

export default combineReducers({
  authReducer,
  userReducer,
  roleReducer,
  orderReducer,
  traceReducer,
  couponReducer,
  reportReducer,
  productReducer,
  profileReducer,
  customerReducer,
  categoryReducer,
  promotionReducer,
  navigationReducer,
  httpRequestReducer,
  allowedClientReducer,
});
