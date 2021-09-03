import ISaleByCustomer from '../../../app/contracts/report/ISaleByCustomer';
import ISaleByProduct from '../../../app/contracts/report/ISaleByProduct';
import {
  REPORT_ACTION_TYPES,
  GET_SALES_BY_PRODUCT,
  SET_SALES_BY_PRODUCT,
  SET_SALES_BY_CUSTOMER,
  GET_SALES_BY_CUSTOMER,
  DOWNLOAD_SALES_BY_PRODUCT_REPORT,
} from '../../types/report/ReportTypes';

interface IReportReducer {
  salesByProduct: ISaleByProduct[],
  salesByCustomer: ISaleByCustomer[],
};

const initialState: IReportReducer = {
  salesByProduct: [],
  salesByCustomer: [],
};

const ReportReducer = (state = initialState, action: REPORT_ACTION_TYPES): IReportReducer => {
  switch (action.type) {
    case GET_SALES_BY_PRODUCT:
    case GET_SALES_BY_CUSTOMER:
    case DOWNLOAD_SALES_BY_PRODUCT_REPORT:
      return {
        ...state,
      }

    case SET_SALES_BY_PRODUCT:
      return {
        ...state,
        salesByProduct: [
          ...action.payload,
        ],
      }

    case SET_SALES_BY_CUSTOMER:
      return {
        ...state,
        salesByCustomer: [
          ...action.payload,
        ],
      }

    default:
      return state;
  }
}

export default ReportReducer;
