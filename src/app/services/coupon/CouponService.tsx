import { DEFAULT_ROWS_PER_PAGE } from '../../../config/app';
import httpClient from '../../../config/axios';
import ICoupon from '../../contracts/coupon/ICoupon';
import ICouponsPaginated from '../../contracts/coupon/table/ICouponsPaginated';
import IBaseFilter from '../../contracts/filter/IBaseFilter';
import IProcessFilter from '../../contracts/filter/IProcessFilter';

class CouponService {
  public static async getAll(filter?: IProcessFilter): Promise<ICouponsPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filter || {};
    let params: IBaseFilter = { page, limit };

    if (typeof filter?.value !== 'undefined' && filter.value?.length > 0) {
      const query = filter.value.toLowerCase();

      params = {
        ...params,
        [filter.filterBy]: query,
      }
    }

    const xhr = await httpClient.get('/coupon', { params }).then(({ data }) => {
      return {
        coupons: data.coupons,
        ...data,
      }
    });

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
