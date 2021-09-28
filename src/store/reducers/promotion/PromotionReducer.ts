import IPagination from '../../../app/contracts/table/IPagination';
import IPromotion from '../../../app/contracts/promotion/IPromotion';
import { paginationInitialState } from '../../../app/data/general/pagination';
import {
  GET_PROMOTION,
  GET_PROMOTIONS,
  SET_PROMOTIONS,
  PROMOTION_ACTION_TYPES,
  SET_PROMOTION,
  REMOVE_PROMOTION,
  CREATE_PROMOTION,
  UPDATE_PROMOTION,
} from '../../types/promotion/PromotionTypes';
import { promotionInitialState } from '../../../app/data/promotions';

interface IPromotionReducer extends IPagination {
  data: IPromotion[],
  promotionToDisplay: IPromotion,
};

const initialState: IPromotionReducer = {
  data: [],
  promotionToDisplay: { ...promotionInitialState },
  ...paginationInitialState,
};

const PromotionReducer = (state = initialState, action: PROMOTION_ACTION_TYPES): IPromotionReducer => {
  switch (action.type) {
    case GET_PROMOTIONS:
    case GET_PROMOTION:
      return {
        ...state,
      }

    case SET_PROMOTIONS:
      return {
        ...state,
        data: [
          ...action.payload.promotions,
        ],
        ...action.payload,
      }

    case SET_PROMOTION:
      return {
        ...state,
        promotionToDisplay: {
          ...action.payload,
        },
      }

    case REMOVE_PROMOTION:
      return {
        ...state,
        data: [
          ...state.data.filter((promotion: IPromotion) => promotion._id !== action.payload),
        ],
      }

    case CREATE_PROMOTION:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload,
          },
        ],
      }

    case UPDATE_PROMOTION:
      let updatedElementIndex = state.data.findIndex((promotion: IPromotion) => promotion._id === action.payload._id);
      let updatedPromotion = [...state.data];
      updatedPromotion[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        data: updatedPromotion,
      }

    default:
      return state;
  }
}

export default PromotionReducer;
