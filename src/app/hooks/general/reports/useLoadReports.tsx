import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startGetSalesByCustomerAction, startGetSalesByProductAction } from "../../../../store/actions/report/ReportActions";

const useLoadReports = () => {
  const dispatch = useDispatch();

  const loadSalesByProduct = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetSalesByProductAction());
      dispatcher();
    },
    [dispatch],
  );

  const loadSalesByCustomer = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetSalesByCustomerAction());
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
