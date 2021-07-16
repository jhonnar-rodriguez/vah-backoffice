import ICategory from '../../../app/contracts/category/ICategory';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export interface GetCategoriesAction {
  type: typeof GET_CATEGORIES,
}

export interface SetCategoriesAction {
  type: typeof SET_CATEGORIES,
  payload: ICategory[],
}

export type CATEGORY_ACTION_TYPES = GetCategoriesAction | SetCategoriesAction;
