import IOrder from '../../../../app/contracts/general/order/IOrder';
import { orderInitialState } from '../../../../app/data/general/orders';
import IPagination from '../../../../app/contracts/table/IPagination';
import { paginationInitialState } from '../../../../app/data/general/pagination';
import {
  SET_ORDER,
  SET_ORDERS,
  GET_ORDERS,
  ORDER_ACTION_TYPES,
  UPDATE_ORDER,
} from '../../../types/general/order/OrderTypes';

interface IOrderReducer extends IPagination {
  orders: IOrder[],
  orderToDisplay: IOrder,
};

const initialState: IOrderReducer = {
  orders: [],
  orderToDisplay: orderInitialState,
  ...paginationInitialState,
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
        ...action.payload,
      }

    case SET_ORDER:
      return {
        ...state,
        orderToDisplay: { ...action.payload },
      }

    case UPDATE_ORDER:
      let updatedElementIndex = state.orders.findIndex((order: IOrder) => order._id === action.payload._id);
      let updatedOrder = [...state.orders];
      updatedOrder[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        orders: updatedOrder,
      }

    default:
      return state;
  }
}

export default OrderReducer;
