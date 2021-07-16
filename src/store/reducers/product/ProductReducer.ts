import {
  GET_PRODUCT,
  SET_PRODUCT,
  GET_PRODUCTS,
  SET_PRODUCTS,
  REMOVE_PRODUCT,
  PRODUCT_ACTION_TYPES,
  CREATE_PRODUCT,
} from './../../types/products/ProductTypes';
import IProduct from "../../../app/contracts/product/IProduct";
import IProductShow from '../../../app/contracts/product/IProductShow';

interface IProductList {
  data: IProduct[],
  productToDisplay: IProductShow,
};

const initialState: IProductList = {
  data: [],
  productToDisplay: {
    _id: '',
    name: '',
    summary: '',
    description: '',
    sku: '',
    price: 0,
    quantity: 0,
    stockStatus: false,
    lowStockAlert: false,
    urlImage: '',
    urlImageMiniature: '',
    isVirtual: false,
    active: false,
    discount: 0,
    totalDiscount: 0,
  },
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
          ...action.payload
        ],
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

    default:
      return state;
  }
}

export default productReducer;
