import { CUSTOMER_ACTION_TYPES } from "./customer/CustomerTypes";
import { PRODUCT_ACTION_TYPES } from "./products/ProductTypes"
import { CATEGORY_ACTION_TYPES } from "./category/CategoryTypes"
import { ALLOWED_CLIENT_ACTION_TYPES } from "./allowedClient/AllowedClientTypes"
import { ORDER_ACTION_TYPES } from "./general/order/OrderTypes"
import { USER_ACTION_TYPES } from "./settings/security/user/UserTypes"
import { ROLE_ACTION_TYPES } from "./settings/security/role/RoleTypes"
import { AUTH_ACTION_TYPES } from "./auth/AuthTypes"

export type AppTypes = CUSTOMER_ACTION_TYPES |
  AUTH_ACTION_TYPES |
  USER_ACTION_TYPES |
  ROLE_ACTION_TYPES |
  ORDER_ACTION_TYPES |
  PRODUCT_ACTION_TYPES |
  CATEGORY_ACTION_TYPES |
  ALLOWED_CLIENT_ACTION_TYPES;
