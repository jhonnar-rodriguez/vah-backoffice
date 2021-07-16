import ICategory from '../../../app/contracts/category/ICategory';
import { CATEGORY_ACTION_TYPES, GET_CATEGORIES, SET_CATEGORIES } from './../../types/category/CategoryTypes';

interface ICategoryReducer {
  list: ICategory[],
};

const initialState: ICategoryReducer = {
  list: [],
};

const categoryReducer = (state = initialState, action: CATEGORY_ACTION_TYPES): ICategoryReducer => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
      }

    case SET_CATEGORIES:
      return {
        ...state,
        list: [
          ...action.payload
        ],
      }

    default:
      return state;
  }
}

export default categoryReducer;
