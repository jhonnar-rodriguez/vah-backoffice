import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetCustomersAction } from "../../../../store/actions/customer/CustomerActions";
import IProcessFilter from "../../../contracts/filter/IProcessFilter";

const useLoadCustomers = () => {
  const dispatch = useDispatch();

  const loadCustomers = useCallback(
    (filter?: IProcessFilter) => {
      const dispatcher = () => dispatch(startGetCustomersAction(filter));
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return [loadCustomers];
}

export default useLoadCustomers;
