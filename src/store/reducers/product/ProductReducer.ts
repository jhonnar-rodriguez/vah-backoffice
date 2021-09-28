import {
  GET_PRODUCT,
  SET_PRODUCT,
  GET_PRODUCTS,
  SET_PRODUCTS,
  REMOVE_PRODUCT,
  PRODUCT_ACTION_TYPES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from './../../types/products/ProductTypes';
import IProduct from "../../../app/contracts/product/IProduct";
import { productInitialState } from '../../../app/data/products';
import IPagination from '../../../app/contracts/table/IPagination';

interface IProductList extends IPagination {
  data: IProduct[],
  productToDisplay: IProduct,
};

const initialState: IProductList = {
  data: [],
  page: 0,
  limit: 0,
  nextPage: 0,
  prevPage: 0,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
  pagingCounter: 0,
  productToDisplay: productInitialState,
};

const productReducer = (state = initialState, action: PRODUCT_ACTION_TYPES): IProductList => {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCT:
      return {
        ...state,
      }

    case SET_PRODUCTS:
      return {
        ...state,
        data: [
          ...action.payload.products,
        ],
        ...action.payload,
      }

    case SET_PRODUCT:
      return {
        ...state,
        productToDisplay: {
          ...action.payload,
        },
      }

    case REMOVE_PRODUCT:
      return {
        ...state,
        data: [
          ...state.data.filter((product: IProduct) => product._id !== action.payload),
        ],
      }

    case CREATE_PRODUCT:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload,
          },
        ],
      }

    case UPDATE_PRODUCT:
      let updatedElementIndex = state.data.findIndex((product: IProduct) => product._id === action.payload._id);
      let updatedProducts = [...state.data];
      updatedProducts[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        data: updatedProducts,
      }

    default:
      return state;
  }
}

export default productReducer;
