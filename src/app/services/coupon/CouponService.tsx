import axios from 'axios';
import ICoupon from '../../contracts/coupon/ICoupon';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});

class CouponService {
  public static async getAll(): Promise<ICoupon[]> {
    const xhr = await httpClient.get('/coupon').then(({ data }) => data.coupons);

    return xhr;
  }

  public static async store(coupon: ICoupon): Promise<ICoupon> {
    const xhr = await httpClient.post("/coupon", { ...coupon }).then(({ data }) => data.coupon);

    return xhr;
  }

  public static async update(coupon: ICoupon): Promise<ICoupon> {
    const xhr = await httpClient.put(`/coupon/${coupon._id}`, { ...coupon }).then(({ data }) => data.coupon);

    return xhr;
  }

  public static async remove(couponId: string): Promise<void> {
    await httpClient.delete(`/coupon/${couponId}`);
  }
}

export default CouponService;
