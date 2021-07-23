import IOrder from "../../../../app/contracts/general/order/IOrder";

export const GET_ORDERS = 'GET_ORDERS';
export const SET_ORDERS = 'SET_ORDERS';

export const SET_ORDER = 'SET_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export interface GetOrdersAction {
  type: typeof GET_ORDERS,
};

export interface SetOrdersAction {
  type: typeof SET_ORDERS,
  payload: IOrder[],
};

export interface SetOrderAction {
  type: typeof SET_ORDER,
  payload: IOrder,
};

export interface UpdateOrderAction {
  type: typeof UPDATE_ORDER,
  payload: IOrder,
};

export type ORDER_ACTION_TYPES = GetOrdersAction |
  SetOrdersAction |
  SetOrderAction |
  UpdateOrderAction;
