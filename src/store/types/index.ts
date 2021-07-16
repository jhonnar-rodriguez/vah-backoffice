import { CUSTOMER_ACTION_TYPES } from "./customer/CustomerTypes";
import { PRODUCT_ACTION_TYPES } from "./products/ProductTypes"
import { CATEGORY_ACTION_TYPES } from "./category/CategoryTypes"

export type AppTypes = CUSTOMER_ACTION_TYPES | PRODUCT_ACTION_TYPES | CATEGORY_ACTION_TYPES;
