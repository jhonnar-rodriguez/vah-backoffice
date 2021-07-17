import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetCustomersAction } from "../../../../store/actions/customer/CustomerActions";

const useLoadCustomers = () => {
  const dispatch = useDispatch();

  const loadCustomers = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetCustomersAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return [];
}

export default useLoadCustomers;
