import IOrder from '../../../../app/contracts/general/order/IOrder';
import { orderInitialState } from '../../../../app/data/general/orders';
import {
  SET_ORDER,
  SET_ORDERS,
  GET_ORDERS,
  ORDER_ACTION_TYPES,
} from '../../../types/general/order/OrderTypes';

interface IOrderReducer {
  list: IOrder[],
  orderToUpdate: IOrder,
};

const initialState: IOrderReducer = {
  list: [],
  orderToUpdate: orderInitialState,
};

const OrderReducer = (state = initialState, action: ORDER_ACTION_TYPES): IOrderReducer => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
      }

    case SET_ORDERS:
      return {
        ...state,
        list: [
          ...action.payload,
        ],
      }

    case SET_ORDER:
      return {
        ...state,
        orderToUpdate: { ...action.payload },
      }

    default:
      return state;
  }
}

export default OrderReducer;
