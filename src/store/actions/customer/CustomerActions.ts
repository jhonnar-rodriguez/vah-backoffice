import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../app/helpers';
import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';
import ICustomer from '../../../app/contracts/customer/ICustomer';
import {
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

export const startGetCustomersAction = () => {
  return async (dispatch: Dispatch<CUSTOMER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getCustomersDispatcher());
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const customers = await CustomerService.getAll();

      dispatch(setCustomersDispatcher(customers));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}
