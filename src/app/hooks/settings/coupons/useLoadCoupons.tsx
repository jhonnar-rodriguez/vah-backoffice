import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetCouponsAction } from "../../../../store/actions/coupon/CouponActions";
import IProcessFilter from "../../../contracts/filter/IProcessFilter";

const useLoadCoupons = () => {
  const dispatch = useDispatch();

  const loadCoupons = useCallback(
    (filter?: IProcessFilter) => {
      const dispatcher = () => dispatch(startGetCouponsAction(filter));
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  return [loadCoupons];
}

export default useLoadCoupons;
