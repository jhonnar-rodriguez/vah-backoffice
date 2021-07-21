import { CUSTOMER_ACTION_TYPES } from "./customer/CustomerTypes";
import { PRODUCT_ACTION_TYPES } from "./products/ProductTypes"
import { CATEGORY_ACTION_TYPES } from "./category/CategoryTypes"
import { ALLOWED_CLIENT_ACTION_TYPES } from "./allowedClient/AllowedClientTypes"

export type AppTypes = CUSTOMER_ACTION_TYPES |
  PRODUCT_ACTION_TYPES |
  CATEGORY_ACTION_TYPES |
  ALLOWED_CLIENT_ACTION_TYPES;
