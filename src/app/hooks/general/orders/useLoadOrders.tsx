import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetOrdersAction } from "../../../../store/actions/general/order/OrderAction";
import IBaseFilter from "../../../contracts/filter/IBaseFilter";

const useLoadOrders = () => {
  const dispatch = useDispatch();

  const loadOrders = useCallback(
    (filters?: IBaseFilter) => {
      const dispatcher = () => dispatch(startGetOrdersAction(filters));
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    loadOrders
  };
}

export default useLoadOrders;
