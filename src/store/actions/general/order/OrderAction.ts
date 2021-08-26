import { Dispatch } from 'redux';
import IOrder from '../../../../app/contracts/general/order/IOrder';
import IOrderChangeStatus from '../../../../app/contracts/general/order/IOrderChangeStatus';
import { orderInitialState } from '../../../../app/data/general/orders';
import { HttpHelper } from '../../../../app/helpers';
import OrderService from '../../../../app/services/general/order/OrderService';
import { GetOrdersAction, ORDER_ACTION_TYPES, SetOrderAction, SetOrdersAction, UpdateOrderAction } from '../../../types/general/order/OrderTypes';
import { HTTP_REQUEST_ACTION_TYPES } from '../../../types/httpRequest/HttpRequestTypes';
import { setFinishedRequestDispatcher, setRunningRequestDispatcher } from '../../httpRequest/HttpRequestActions';

export const getOrdersDispatcher = (): GetOrdersAction => ({
  type: 'GET_ORDERS',
});

export const setOrdersDispatcher = (orders: IOrder[]): SetOrdersAction => ({
  type: 'SET_ORDERS',
  payload: orders,
});

export const updateOrderDispatcher = (order: IOrder): UpdateOrderAction => ({
  type: 'UPDATE_ORDER',
  payload: order,
});

export const setOrderDispatcher = (order: IOrder): SetOrderAction => ({
  type: 'SET_ORDER',
  payload: order,
});

export const startGetOrdersAction = () => {
  return async (dispatch: Dispatch<ORDER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getOrdersDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const orders = await OrderService.getAll();

      dispatch(setOrdersDispatcher(orders.filter((order: IOrder) => order.status.toLowerCase() === 'pending')));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startUpdateOrderAction = (order: IOrderChangeStatus) => {
  return async (dispatch: Dispatch<ORDER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const updatedOrder = await OrderService.update(order);

      dispatch(updateOrderDispatcher(updatedOrder));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "actualizado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startGetOrderAction = (orderId: string) => {
  return async (dispatch: Dispatch<ORDER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const order = await OrderService.getById(orderId);

      dispatch(setOrderDispatcher(order));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setOrderDispatcher(orderInitialState));
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
