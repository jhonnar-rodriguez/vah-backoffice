import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetOrdersAction } from "../../../../store/actions/general/order/OrderAction";

const useLoadOrders = () => {
  const dispatch = useDispatch();

  const loadOrders = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetOrdersAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return [];
}

export default useLoadOrders;
