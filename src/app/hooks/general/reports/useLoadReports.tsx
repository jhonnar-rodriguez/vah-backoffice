import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startGetSalesByProductAction } from "../../../../store/actions/report/ReportActions";

const useLoadReports = () => {
  const dispatch = useDispatch();

  const loadSalesByProduct = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetSalesByProductAction());
      dispatcher();
    },
    [dispatch],
  );

  return {
    loadSalesByProduct,
  };
}

export default useLoadReports;
