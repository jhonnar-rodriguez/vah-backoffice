import IProduct from '../../../app/contracts/product/IProduct';

export const GET_PRODUCT = 'GET_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const READ_PRODUCT = 'READ_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export interface GetProductsAction {
  type: typeof GET_PRODUCTS,
}

export interface SetProductsAction {
  type: typeof SET_PRODUCTS,
  payload: IProduct[],
}

export interface GetProductAction {
  type: typeof GET_PRODUCT,
  payload: string,
}

export interface SetProductAction {
  type: typeof SET_PRODUCT,
  payload: IProduct,
}

export interface CreateProductAction {
  type: typeof CREATE_PRODUCT,
  payload: IProduct,
};

export interface ReadProductAction {
  type: typeof READ_PRODUCT,
};

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT,
  payload: IProduct,
};

export interface RemoveProductAction {
  type: typeof REMOVE_PRODUCT,
  payload: string,
};

export type PRODUCT_ACTION_TYPES =
  GetProductsAction |
  SetProductsAction |
  GetProductAction |
  SetProductAction |
  CreateProductAction |
  ReadProductAction |
  UpdateProductAction |
  RemoveProductAction;
