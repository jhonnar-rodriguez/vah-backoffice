import ICustomer from "../../../app/contracts/customer/ICustomer";
import ICustomersPaginated from "../../../app/contracts/customer/table/ICustomersPaginated";

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const DOWNLOAD_CUSTOMERS = 'DOWNLOAD_CUSTOMERS';
export const SET_CUSTOMERS = 'SET_CUSTOMERS';
export const SET_CUSTOMER = 'SET_CUSTOMER';

export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const READ_CUSTOMER = 'READ_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

export interface GetCustomersAction {
  type: typeof GET_CUSTOMERS,
};

export interface DownloadCustomersAction {
  type: typeof DOWNLOAD_CUSTOMERS,
};

export interface SetCustomersAction {
  type: typeof SET_CUSTOMERS,
  payload: ICustomersPaginated,
};

export interface SetCustomerAction {
  type: typeof SET_CUSTOMER,
  payload: ICustomer,
};

export interface CreateCustomerAction {
  type: typeof CREATE_CUSTOMER,
  payload: ICustomer,
};

export interface ReadCustomerAction {
  type: typeof READ_CUSTOMER,
};

export interface UpdateCustomerAction {
  type: typeof UPDATE_CUSTOMER,
  payload: ICustomer,
};

export interface RemoveCustomerAction {
  type: typeof REMOVE_CUSTOMER,
  payload: string,
};

export type CUSTOMER_ACTION_TYPES = GetCustomersAction |
  SetCustomerAction |
  SetCustomersAction |
  ReadCustomerAction |
  RemoveCustomerAction |
  CreateCustomerAction |
  DownloadCustomersAction |
  UpdateCustomerAction;
