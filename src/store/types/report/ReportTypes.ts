import ISaleByCustomer from "../../../app/contracts/report/ISaleByCustomer";
import ISaleByProduct from "../../../app/contracts/report/ISaleByProduct";

export const GET_SALES_BY_PRODUCT = 'GET_SALES_BY_PRODUCT';
export const SET_SALES_BY_PRODUCT = 'SET_SALES_BY_PRODUCT';
export const DOWNLOAD_SALES_BY_PRODUCT_REPORT = 'DOWNLOAD_SALES_BY_PRODUCT_REPORT';

export const GET_SALES_BY_CUSTOMER = 'GET_SALES_BY_CUSTOMER';
export const SET_SALES_BY_CUSTOMER = 'SET_SALES_BY_CUSTOMER';

export interface GetSalesByProductAction {
  type: typeof GET_SALES_BY_PRODUCT,
};

export interface SetSalesByProductAction {
  type: typeof SET_SALES_BY_PRODUCT,
  payload: ISaleByProduct[],
};

export interface GetSalesByCustomerAction {
  type: typeof GET_SALES_BY_CUSTOMER,
};

export interface SetSalesByCustomerAction {
  type: typeof SET_SALES_BY_CUSTOMER,
  payload: ISaleByCustomer[],
};

export interface DownloadSalesByProductReportAction {
  type: typeof DOWNLOAD_SALES_BY_PRODUCT_REPORT,
};


export type REPORT_ACTION_TYPES =
  GetSalesByProductAction |
  SetSalesByProductAction |
  GetSalesByCustomerAction |
  SetSalesByCustomerAction |
  DownloadSalesByProductReportAction;
