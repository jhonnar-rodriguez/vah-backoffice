import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../app/helpers';

import CouponService from '../../../app/services/coupon/CouponService';
import ICoupon from '../../../app/contracts/coupon/ICoupon';
import {
  SetCouponsAction,
  GetCouponsAction,
  CreateCouponAction,
  RemoveCouponAction,
  UpdateCouponAction,
  COUPON_ACTION_TYPES,
} from '../../types/coupon/CouponTypes';

export const getCouponDispatcher = (): GetCouponsAction => ({
  type: 'GET_COUPONS',
});

export const setCouponDispatcher = (coupons: ICoupon[]): SetCouponsAction => ({
  type: 'SET_COUPONS',
  payload: coupons,
});

export const createCouponDispatcher = (coupon: ICoupon): CreateCouponAction => ({
  type: 'CREATE_COUPON',
  payload: coupon,
});

export const updateCouponDispatcher = (coupon: ICoupon): UpdateCouponAction => ({
  type: 'UPDATE_COUPON',
  payload: coupon,
});

export const removeCouponDispatcher = (couponId: string): RemoveCouponAction => ({
  type: 'REMOVE_COUPON',
  payload: couponId,
});

export const startGetCouponAction = () => {
  return async (dispatch: Dispatch<COUPON_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getCouponDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const coupons = await CouponService.getAll();

      dispatch(setCouponDispatcher(coupons));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startCreateCouponAction = (coupon: ICoupon) => {
  return async (dispatch: Dispatch<COUPON_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const createCoupon = await CouponService.store(coupon);

      dispatch(createCouponDispatcher(createCoupon));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ statusCode: 201 })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startUpdateCouponAction = (coupon: ICoupon) => {
  return async (dispatch: Dispatch<COUPON_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const updatedCoupon = await CouponService.update(coupon);

      dispatch(updateCouponDispatcher(updatedCoupon));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "actualizado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startRemoveCustomerAction = (couponId: string) => {
  return async (dispatch: Dispatch<COUPON_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      await CouponService.remove(couponId);

      dispatch(removeCouponDispatcher(couponId));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "eliminado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
