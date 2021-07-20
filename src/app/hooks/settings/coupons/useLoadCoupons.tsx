import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetCouponsAction } from "../../../../store/actions/coupon/CouponActions";

const useLoadCoupons = () => {
  const dispatch = useDispatch();

  const loadCoupons = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetCouponsAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  return [];
}

export default useLoadCoupons;
