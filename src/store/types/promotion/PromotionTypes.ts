import IPromotion from "../../../app/contracts/promotion/IPromotion";
import IPromotionsPaginated from "../../../app/contracts/promotion/table/IPromotionsPaginated";

export const GET_PROMOTION = 'GET_PROMOTION';
export const SET_PROMOTION = 'SET_PROMOTION';
export const GET_PROMOTIONS = 'GET_PROMOTIONS';
export const SET_PROMOTIONS = 'SET_PROMOTIONS';

export const CREATE_PROMOTION = 'CREATE_PROMOTION';
export const READ_PROMOTION = 'READ_PROMOTION';
export const UPDATE_PROMOTION = 'UPDATE_PROMOTION';
export const REMOVE_PROMOTION = 'REMOVE_PROMOTION';

export interface GetPromotionAction {
  type: typeof GET_PROMOTION,
};

export interface SetPromotionAction {
  type: typeof SET_PROMOTION,
  payload: IPromotion,
}

export interface GetPromotionsAction {
  type: typeof GET_PROMOTIONS,
};

export interface SetPromotionsAction {
  type: typeof SET_PROMOTIONS,
  payload: IPromotionsPaginated,
};

export interface CreatePromotionAction {
  type: typeof CREATE_PROMOTION,
  payload: IPromotion,
};

export interface UpdatePromotionAction {
  type: typeof UPDATE_PROMOTION,
  payload: IPromotion,
};

export interface RemovePromotionAction {
  type: typeof REMOVE_PROMOTION,
  payload: string,
};

export type PROMOTION_ACTION_TYPES =
  GetPromotionAction |
  SetPromotionAction |
  GetPromotionsAction |
  SetPromotionsAction |
  RemovePromotionAction |
  UpdatePromotionAction |
  CreatePromotionAction;

