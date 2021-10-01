import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../app/helpers';
import ReportService from '../../../app/services/general/report/ReportService';
import IReportFilter from '../../../app/contracts/report/filters/IReportFilter';
import ISalesByCustomersPaginated from '../../../app/contracts/report/tables/ISalesByCustomersPaginated';
import ISalesByProductsPaginated from '../../../app/contracts/report/tables/ISalesByProductsPaginated';
import {
  REPORT_ACTION_TYPES,
  GetSalesByProductAction,
  SetSalesByProductAction,
  GetSalesByCustomerAction,
  SetSalesByCustomerAction,
  DownloadSalesByProductReportAction,
} from '../../types/report/ReportTypes';

export const getSalesByProductDispatcher = (): GetSalesByProductAction => ({
  type: 'GET_SALES_BY_PRODUCT',
});

export const setSalesByProductDispatcher = (sales: ISalesByProductsPaginated): SetSalesByProductAction => ({
  type: 'SET_SALES_BY_PRODUCT',
  payload: sales,
});

export const getSalesByCustomerDispatcher = (): GetSalesByCustomerAction => ({
  type: 'GET_SALES_BY_CUSTOMER',
});

export const setSalesByCustomerDispatcher = (sales: ISalesByCustomersPaginated): SetSalesByCustomerAction => ({
  type: 'SET_SALES_BY_CUSTOMER',
  payload: sales,
});

export const setDownloadSalesByProductReportDispatcher = (): DownloadSalesByProductReportAction => ({
  type: 'DOWNLOAD_SALES_BY_PRODUCT_REPORT',
});

export const startGetSalesByProductAction = (filters?: IReportFilter) => {
  return async (dispatch: Dispatch<REPORT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getSalesByProductDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const salesByProduct = await ReportService.getSalesByProduct(filters);
      dispatch(setSalesByProductDispatcher(salesByProduct));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startGetSalesByCustomerAction = (filters?: IReportFilter) => {
  return async (dispatch: Dispatch<REPORT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getSalesByCustomerDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const salesByCustomer = await ReportService.getSalesByCustomer(filters);

      dispatch(setSalesByCustomerDispatcher(salesByCustomer));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startDownloadSaleReportByName = (reportName: string) => {
  return async (dispatch: Dispatch<REPORT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getSalesByProductDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      await ReportService.downloadSalesReportByName(reportName);
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
