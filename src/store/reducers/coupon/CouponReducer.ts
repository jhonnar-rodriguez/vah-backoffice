import ICoupon from '../../../app/contracts/coupon/ICoupon';
import IPagination from '../../../app/contracts/table/IPagination';
import { paginationInitialState } from '../../../app/data/general/pagination';
import {
  SET_COUPONS,
  GET_COUPONS,
  CREATE_COUPON,
  REMOVE_COUPON,
  UPDATE_COUPON,
  COUPON_ACTION_TYPES,
} from './../../types/coupon/CouponTypes';

interface ICouponReducer extends IPagination {
  list: ICoupon[],
};

const initialState: ICouponReducer = {
  list: [],
  ...paginationInitialState,
};

const CouponReducer = (state = initialState, action: COUPON_ACTION_TYPES): ICouponReducer => {
  switch (action.type) {
    case GET_COUPONS:
      return {
        ...state,
      }

    case SET_COUPONS:
      return {
        ...state,
        list: [
          ...action.payload.coupons,
        ],
        ...action.payload,
      }

    case CREATE_COUPON:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
          },
        ],
      }

    case UPDATE_COUPON:
      let updatedElementIndex = state.list.findIndex((coupon: ICoupon) => coupon._id === action.payload._id);
      let updatedCoupon = [...state.list];
      updatedCoupon[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        list: updatedCoupon,
      }

    case REMOVE_COUPON:
      return {
        ...state,
        list: [
          ...state.list.filter((coupon: ICoupon) => coupon._id !== action.payload),
        ],
      }

    default:
      return state;
  }
}

export default CouponReducer;
