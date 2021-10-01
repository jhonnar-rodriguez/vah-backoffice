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
import IProcessFilter from '../../../app/contracts/filter/IProcessFilter';
import ICouponsPaginated from '../../../app/contracts/coupon/table/ICouponsPaginated';

export const getCouponsDispatcher = (): GetCouponsAction => ({
  type: 'GET_COUPONS',
});

export const setCouponsDispatcher = (coupons: ICouponsPaginated): SetCouponsAction => ({
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

export const startGetCouponsAction = (filter?: IProcessFilter) => {
  return async (dispatch: Dispatch<COUPON_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getCouponsDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const coupons = await CouponService.getAll(filter);

      dispatch(setCouponsDispatcher(coupons));
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

export const startRemoveCouponAction = (couponId: string) => {
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
