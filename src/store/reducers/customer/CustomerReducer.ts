import ICustomer from '../../../app/contracts/customer/ICustomer';
import IPagination from '../../../app/contracts/table/IPagination';
import { paginationInitialState } from '../../../app/data/general/pagination';
import {
  CREATE_CUSTOMER,
  GET_CUSTOMERS,
  SET_CUSTOMERS,
  REMOVE_CUSTOMER,
  UPDATE_CUSTOMER,
  CUSTOMER_ACTION_TYPES,
} from '../../types/customer/CustomerTypes';

interface ICustomerReducer extends IPagination {
  list: ICustomer[],
};

const initialState: ICustomerReducer = {
  list: [],
  ...paginationInitialState,
};

const CustomerReducer = (state = initialState, action: CUSTOMER_ACTION_TYPES): ICustomerReducer => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
      }

    case SET_CUSTOMERS:
      return {
        ...state,
        list: [
          ...action.payload.customers,
        ],
        ...action.payload,
      }

    case CREATE_CUSTOMER:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
          },
        ],
      }

    case UPDATE_CUSTOMER:
      let updatedElementIndex = state.list.findIndex((customer: ICustomer) => customer._id === action.payload._id);
      let updatedCustomer = [...state.list];
      updatedCustomer[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        list: updatedCustomer,
      }

    case REMOVE_CUSTOMER:
      return {
        ...state,
        list: [
          ...state.list.filter((customer: ICustomer) => customer._id !== action.payload),
        ],
      }

    default:
      return state;
  }
}

export default CustomerReducer;
