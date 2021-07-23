import IOrder from '../../../../app/contracts/general/order/IOrder';
import { orderInitialState } from '../../../../app/data/general/orders';
import {
  SET_ORDER,
  SET_ORDERS,
  GET_ORDERS,
  ORDER_ACTION_TYPES,
  UPDATE_ORDER,
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

    case UPDATE_ORDER:
      let updatedElementIndex = state.list.findIndex((order: IOrder) => order._id === action.payload._id);
      let updatedOrder = [...state.list];
      updatedOrder[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        list: updatedOrder,
      }

    default:
      return state;
  }
}

export default OrderReducer;
