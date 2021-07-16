import ICustomer from "../../../app/contracts/customer/ICustomer";

export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const SET_CUSTOMERS = 'SET_CUSTOMERS';
export const SET_CUSTOMER_INFORMATION = 'SET_CUSTOMER_INFORMATION';

export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const READ_CUSTOMER = 'READ_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

export interface GetCustomersAction {
  type: typeof GET_CUSTOMERS,
};

export interface SetCustomersAction {
  type: typeof SET_CUSTOMERS,
  payload: ICustomer[],
};

export interface SetCustomerInformationAction {
  type: typeof SET_CUSTOMER_INFORMATION,
  payload: ICustomer[],
};

export interface CreateCustomerAction {
  type: typeof CREATE_CUSTOMER,
};

export interface ReadCustomerAction {
  type: typeof READ_CUSTOMER,
};

export interface UpdateCustomerAction {
  type: typeof UPDATE_CUSTOMER,
};

export interface RemoveCustomerAction {
  type: typeof REMOVE_CUSTOMER,
};

export type CUSTOMER_ACTION_TYPES = GetCustomersAction |
  SetCustomersAction |
  ReadCustomerAction |
  RemoveCustomerAction |
  CreateCustomerAction |
  UpdateCustomerAction |
  SetCustomerInformationAction;
