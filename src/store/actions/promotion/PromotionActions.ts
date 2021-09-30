import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';
import { HttpHelper } from '../../../app/helpers';
import IProcessFilter from '../../../app/contracts/filter/IProcessFilter';
import {
  SetPromotionAction,
  GetPromotionsAction,
  SetPromotionsAction,
  UpdatePromotionAction,
  RemovePromotionAction,
  CreatePromotionAction,
  PROMOTION_ACTION_TYPES,
} from '../../types/promotion/PromotionTypes';
import IPromotionsPaginated from '../../../app/contracts/promotion/table/IPromotionsPaginated';
import IPromotion from '../../../app/contracts/promotion/IPromotion';
import PromotionService from '../../../app/services/promotion/PromotionService';

export const getPromotionsDispatcher = (): GetPromotionsAction => ({
  type: 'GET_PROMOTIONS',
});

export const setPromotionsDispatcher = (records: IPromotionsPaginated): SetPromotionsAction => ({
  type: 'SET_PROMOTIONS',
  payload: records,
});

export const setPromotionDispatcher = (promotion: IPromotion): SetPromotionAction => ({
  type: 'SET_PROMOTION',
  payload: promotion,
});

export const createPromotionDispatcher = (promotion: IPromotion): CreatePromotionAction => ({
  type: 'CREATE_PROMOTION',
  payload: promotion,
});

export const updatePromotionDispatcher = (promotion: IPromotion): UpdatePromotionAction => ({
  type: 'UPDATE_PROMOTION',
  payload: promotion,
});

export const removePromotionDispatcher = (promotionId: string): RemovePromotionAction => ({
  type: 'REMOVE_PROMOTION',
  payload: promotionId,
});

export const startGetPromotionsAction = (filter?: IProcessFilter) => {
  return async (dispatch: Dispatch<PROMOTION_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());
    dispatch(getPromotionsDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const promotions = await PromotionService.getAll(filter);
      dispatch(setPromotionsDispatcher(promotions));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startGetPromotionAction = (promotionId: string) => {
  return async (dispatch: Dispatch<PROMOTION_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getPromotionsDispatcher());
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const promotion = await PromotionService.getById(promotionId);
      dispatch(setPromotionDispatcher(promotion));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startCreatePromotionAction = (promotion: IPromotion) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const promotionResponse = await PromotionService.store(promotion);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: 'La promoción ha sido creada satisfactoriamente.',
          statusCode: 201,
          statusText: 'Created',
        }
      }

      // dispatch(createPromotionDispatcher(promotionResponse));
      dispatch(startGetPromotionsAction());
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startRemovePromotionAction = (promotionId: string) => {
  return async (dispatch: Dispatch<PROMOTION_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());


    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      await PromotionService.remove(promotionId);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: 'La promoción ha sido eliminada satisfactoriamente.',
          statusCode: 200,
          statusText: 'Deleted',
        }
      }

      dispatch(removePromotionDispatcher(promotionId));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startUpdatePromotionAction = (promotion: IPromotion) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const updatedPromotion = await PromotionService.update(promotion);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: 'La promoción ha sido actualizada satisfactoriamente.',
          statusCode: 200,
          statusText: 'Created',
        }
      }

      dispatch(updatePromotionDispatcher(updatedPromotion));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startSetPromotionAction = (promotion: IPromotion) => {
  return async (dispatch: Dispatch<PROMOTION_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setPromotionDispatcher(promotion));
  }
}
