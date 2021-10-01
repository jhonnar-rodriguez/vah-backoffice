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
  UpdateCustomerAction,
} from './../../types/customer/CustomerTypes';
import CustomerService from '../../../app/services/customer/CustomerService';
import IProcessFilter from '../../../app/contracts/filter/IProcessFilter';
import ICustomersPaginated from '../../../app/contracts/customer/table/ICustomersPaginated';

export const getCustomersDispatcher = (): GetCustomersAction => ({
  type: 'GET_CUSTOMERS',
});

export const setCustomersDispatcher = (customers: ICustomersPaginated): SetCustomersAction => ({
  type: 'SET_CUSTOMERS',
  payload: customers,
});

export const createCustomerDispatcher = (customer: ICustomer): CreateCustomerAction => ({
  type: 'CREATE_CUSTOMER',
  payload: customer,
});

export const updateCustomerDispatcher = (customer: ICustomer): UpdateCustomerAction => ({
  type: 'UPDATE_CUSTOMER',
  payload: customer,
});

export const removeCustomerDispatcher = (customerId: string): RemoveCustomerAction => ({
  type: 'REMOVE_CUSTOMER',
  payload: customerId,
});

export const startGetCustomersAction = (filter?: IProcessFilter) => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getCustomersDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const customers = await CustomerService.getAll(filter);

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

export const startUpdateCustomerAction = (customer: ICustomer) => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const updatedCustomer = await CustomerService.update(customer);

      dispatch(updateCustomerDispatcher(updatedCustomer));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "actualizado" })));
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
