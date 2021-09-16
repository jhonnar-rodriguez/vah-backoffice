import { CUSTOMER_ACTION_TYPES } from "./customer/CustomerTypes";
import { PRODUCT_ACTION_TYPES } from "./products/ProductTypes"
import { CATEGORY_ACTION_TYPES } from "./category/CategoryTypes"
import { ALLOWED_CLIENT_ACTION_TYPES } from "./allowedClient/AllowedClientTypes"
import { ORDER_ACTION_TYPES } from "./general/order/OrderTypes"
import { USER_ACTION_TYPES } from "./settings/security/user/UserTypes"
import { ROLE_ACTION_TYPES } from "./settings/security/role/RoleTypes"
import { AUTH_ACTION_TYPES } from "./auth/AuthTypes"
import { TRACE_ACTION_TYPES } from "./general/trace/TraceTypes"
import { REPORT_ACTION_TYPES } from './report/ReportTypes';
import { PROFILE_ACTION_TYPES } from './profile/ProfileTypes';

export type AppTypes =
  AUTH_ACTION_TYPES |
  USER_ACTION_TYPES |
  ROLE_ACTION_TYPES |
  TRACE_ACTION_TYPES |
  ORDER_ACTION_TYPES |
  REPORT_ACTION_TYPES |
  PROFILE_ACTION_TYPES |
  PRODUCT_ACTION_TYPES |
  CUSTOMER_ACTION_TYPES |
  CATEGORY_ACTION_TYPES |
  ALLOWED_CLIENT_ACTION_TYPES;
