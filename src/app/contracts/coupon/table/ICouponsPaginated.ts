import ICoupon from "../ICoupon";
import IPagination from "../../table/IPagination";

interface ICouponsPaginated extends IPagination {
  coupons: ICoupon[],
}

export default ICouponsPaginated;
