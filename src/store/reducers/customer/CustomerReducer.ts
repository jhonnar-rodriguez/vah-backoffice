import ICustomer from '../../../app/contracts/customer/ICustomer';
import { CUSTOMER_ACTION_TYPES, GET_CUSTOMERS } from '../../types/customer/CustomerTypes';

const initialState: ICustomer = {
  _id: '',
  name: '',
  code: '',
  email: '',
  mobile: '',
  document: '',
  surname: '',
  documentType: '',
};

const CustomerReducer = (state = initialState, action: CUSTOMER_ACTION_TYPES): ICustomer => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
      }

    // case SET_CUSTOMER_INFORMATION:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }

    // case SET_NEW_ADDRESS_IN_STORAGE:
    //   return {
    //     ...state,
    //     addresses: [
    //       ...state.addresses,
    //       {
    //         ...action.payload,
    //       },
    //     ],
    //   }

    // case REMOVE_CUSTOMER_ADDRESS:
    //   return {
    //     ...state,
    //     addresses: [
    //       ...state.addresses.filter((address: IAddress) => address._id !== action.payload),
    //     ],
    //   }

    // case UPDATE_CUSTOMER_ADDRESS:
    //   let updatedElementIndex = state.addresses.findIndex((address: IAddress) => address._id === action.payload._id);
    //   let updatedAddress = [...state.addresses];
    //   updatedAddress[updatedElementIndex] = { ...action.payload };

    //   return {
    //     ...state,
    //     addresses: updatedAddress,
    //   }

    // case SET_CUSTOMER_ORDERS:
    //   return {
    //     ...state,
    //     orders: action.payload,
    //   }

    default:
      return state;
  }
}

export default CustomerReducer;
