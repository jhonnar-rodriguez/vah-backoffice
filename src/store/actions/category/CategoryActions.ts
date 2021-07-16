import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from './../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from './../httpRequest/HttpRequestActions';
import { CATEGORY_ACTION_TYPES } from '../../types/category/CategoryTypes';
import ICategory from '../../../app/contracts/category/ICategory';
import { GetCategoriesAction, SetCategoriesAction } from '../../types/category/CategoryTypes';
import CategoryService from '../../../app/services/category/CategoryService';
import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';
import { HttpHelper } from '../../../app/helpers';

export const getCategoriesDispatcher = (): GetCategoriesAction => ({
  type: 'GET_CATEGORIES',
});

export const setCategoriesDispatcher = (categories: ICategory[]): SetCategoriesAction => ({
  type: 'SET_CATEGORIES',
  payload: categories,
});

export const startGetCategoriesAction = () => {
  return async (dispatch: Dispatch<CATEGORY_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getCategoriesDispatcher());
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const categories = await CategoryService.get();
      dispatch(setCategoriesDispatcher(categories));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}
