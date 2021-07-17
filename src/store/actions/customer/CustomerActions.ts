import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../app/helpers';
import ICustomer from '../../../app/contracts/customer/ICustomer';
import {
  CreateCustomerAction,
  CUSTOMER_ACTION_TYPES,
  GetCustomersAction,
  SetCustomersAction,
} from './../../types/customer/CustomerTypes';
import CustomerService from '../../../app/services/customer/CustomerService';

export const getCustomersDispatcher = (): GetCustomersAction => ({
  type: 'GET_CUSTOMERS',
});

export const setCustomersDispatcher = (customers: ICustomer[]): SetCustomersAction => ({
  type: 'SET_CUSTOMERS',
  payload: customers,
});

export const createCustomerDispatcher = (customer: ICustomer): CreateCustomerAction => ({
  type: 'CREATE_CUSTOMER',
  payload: customer,
});

export const startGetCustomersAction = () => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getCustomersDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const customers = await CustomerService.getAll();

      dispatch(setCustomersDispatcher(customers));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    };
  };
};

export const startCreateCustomerAction = (customer: ICustomer) => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const createdCustomer = await CustomerService.store(customer);

      dispatch(createCustomerDispatcher(createdCustomer));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    };
  };
};
