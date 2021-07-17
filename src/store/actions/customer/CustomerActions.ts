import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../app/helpers';
import ICustomer from '../../../app/contracts/customer/ICustomer';
import {
  CreateCustomerAction,
  CUSTOMER_ACTION_TYPES,
  GetCustomersAction,
  RemoveCustomerAction,
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

export const removeCustomerDispatcher = (customerId: string): RemoveCustomerAction => ({
  type: 'REMOVE_CUSTOMER',
  payload: customerId,
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
    }
  }
}

export const startCreateCustomerAction = (customer: ICustomer) => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const createdCustomer = await CustomerService.store(customer);

      dispatch(createCustomerDispatcher(createdCustomer));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ statusCode: 201 })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startRemoveCustomerAction = (customerId: string) => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      await CustomerService.remove(customerId);

      dispatch(removeCustomerDispatcher(customerId));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "eliminado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
