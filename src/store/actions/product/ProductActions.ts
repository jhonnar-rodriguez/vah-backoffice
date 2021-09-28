import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';
import { HttpHelper } from '../../../app/helpers';
import IProduct from '../../../app/contracts/product/IProduct';
import ProductService from '../../../app/services/product/ProductService';
import {
  SetProductAction,
  GetProductsAction,
  SetProductsAction,
  PRODUCT_ACTION_TYPES,
  RemoveProductAction,
  CreateProductAction,
  UpdateProductAction,
} from '../../types/products/ProductTypes';
import IProcessFilter from '../../../app/contracts/filter/IProcessFilter';
import IProductsPaginated from '../../../app/contracts/product/table/IProductsPaginated';

export const getProductsDispatcher = (): GetProductsAction => ({
  type: 'GET_PRODUCTS',
});

export const setProductsDispatcher = (records: IProductsPaginated): SetProductsAction => ({
  type: 'SET_PRODUCTS',
  payload: records,
});

export const setProductDispatcher = (product: IProduct): SetProductAction => ({
  type: 'SET_PRODUCT',
  payload: product,
});

export const createProductDispatcher = (product: IProduct): CreateProductAction => ({
  type: 'CREATE_PRODUCT',
  payload: product,
});

export const updateProductDispatcher = (product: IProduct): UpdateProductAction => ({
  type: 'UPDATE_PRODUCT',
  payload: product,
});

export const removeProductDispatcher = (productId: string): RemoveProductAction => ({
  type: 'REMOVE_PRODUCT',
  payload: productId,
});

export const startGetProductsAction = (filter?: IProcessFilter) => {
  return async (dispatch: Dispatch<PRODUCT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());
    dispatch(getProductsDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const products = await ProductService.getAll(filter);
      dispatch(setProductsDispatcher(products));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startGetProductAction = (productId: string) => {
  return async (dispatch: Dispatch<PRODUCT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getProductsDispatcher());
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const product = await ProductService.getById(productId);
      dispatch(setProductDispatcher(product));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startCreateProductAction = (product: IProduct) => {
  return async (dispatch: Dispatch<PRODUCT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const productResponse = await ProductService.store(product);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: "El producto ha sido creado satisfactoriamente.",
          statusCode: 201,
          statusText: "Created",
        }
      }

      dispatch(createProductDispatcher(productResponse));
      dispatch(getProductsDispatcher());
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startRemoveProductAction = (productId: string) => {
  return async (dispatch: Dispatch<PRODUCT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());


    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      await ProductService.remove(productId);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: "El producto ha sido eliminado satisfactoriamente.",
          statusCode: 200,
          statusText: "Deleted",
        }
      }

      dispatch(removeProductDispatcher(productId));
      dispatch(getProductsDispatcher());
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startUpdateProductAction = (product: IProduct) => {
  return async (dispatch: Dispatch<PRODUCT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequest = {
      isLoading: false,
    };

    try {
      const updatedProduct = await ProductService.update(product);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: "El producto ha sido actualizado satisfactoriamente.",
          statusCode: 200,
          statusText: "Created",
        }
      }

      dispatch(updateProductDispatcher(updatedProduct));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startSetProductAction = (product: IProduct) => {
  return async (dispatch: Dispatch<PRODUCT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setProductDispatcher(product));
  }
}