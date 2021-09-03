import ISaleByProduct from '../../../app/contracts/report/ISaleByProduct';
import { DOWNLOAD_SALES_BY_PRODUCT_REPORT, GET_SALES_BY_PRODUCT, REPORT_ACTION_TYPES, SET_SALES_BY_PRODUCT } from '../../types/report/ReportTypes';

interface IReportReducer {
  salesByProduct: ISaleByProduct[],
};

const initialState: IReportReducer = {
  salesByProduct: [],
};

const ReportReducer = (state = initialState, action: REPORT_ACTION_TYPES): IReportReducer => {
  switch (action.type) {
    case GET_SALES_BY_PRODUCT:
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

    default:
      return state;
  }
}

export default ReportReducer;
