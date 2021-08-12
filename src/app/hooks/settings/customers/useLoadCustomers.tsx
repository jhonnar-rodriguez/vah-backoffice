import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetCustomersAction } from "../../../../store/actions/customer/CustomerActions";

const useLoadCustomers = () => {
  const dispatch = useDispatch();

  const loadCustomers = useCallback(
    (q?: string) => {
      const dispatcher = () => dispatch(startGetCustomersAction(q));
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
