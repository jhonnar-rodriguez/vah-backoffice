import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startGetSalesByCustomerAction, startGetSalesByProductAction } from "../../../../store/actions/report/ReportActions";
import IReportFilter from "../../../contracts/report/filters/IReportFilter";

const useLoadReports = () => {
  const dispatch = useDispatch();

  const loadSalesByProduct = useCallback(
    (filters?: IReportFilter) => {
      const dispatcher = () => dispatch(startGetSalesByProductAction(filters));
      dispatcher();
    },
    [dispatch],
  );

  const loadSalesByCustomer = useCallback(
    (filters?: IReportFilter) => {
      const dispatcher = () => dispatch(startGetSalesByCustomerAction(filters));
      dispatcher();
    },
    [dispatch],
  );

  return {
    loadSalesByProduct,
    loadSalesByCustomer,
  };
}

export default useLoadReports;
