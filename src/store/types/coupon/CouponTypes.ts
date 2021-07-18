import ICoupon from "../../../app/contracts/coupon/ICoupon";

export const GET_COUPONS = 'GET_COUPONS';
export const SET_COUPONS = 'SET_COUPONS';

export const CREATE_COUPON = 'CREATE_COUPON';
export const READ_COUPON = 'READ_COUPON';
export const UPDATE_COUPON = 'UPDATE_COUPON';
export const REMOVE_COUPON = 'REMOVE_COUPON';

export interface GetCouponsAction {
  type: typeof GET_COUPONS,
};

export interface SetCouponsAction {
  type: typeof SET_COUPONS,
  payload: ICoupon[],
};

export interface CreateCouponAction {
  type: typeof CREATE_COUPON,
  payload: ICoupon,
};

export interface ReadCouponAction {
  type: typeof READ_COUPON,
};

export interface UpdateCouponAction {
  type: typeof UPDATE_COUPON,
  payload: ICoupon,
};

export interface RemoveCouponAction {
  type: typeof REMOVE_COUPON,
  payload: string,
};

export type COUPON_ACTION_TYPES = GetCouponsAction |
  SetCouponsAction |
  ReadCouponAction |
  RemoveCouponAction |
  CreateCouponAction |
  UpdateCouponAction;
