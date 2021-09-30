import httpClient from '../../../config/axios';
import IProcessFilter from '../../contracts/filter/IProcessFilter';
import IPromotionParamSearch from '../../contracts/filter/IPromotionParamSearch';
import IPromotion from '../../contracts/promotion/IPromotion';
import IPromotionsPaginated from '../../contracts/promotion/table/IPromotionsPaginated';
import { DEFAULT_ROWS_PER_PAGE } from '../../../config/app';

class PromotionService {
  public static async getAll(filter?: IProcessFilter): Promise<IPromotionsPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filter || {};

    let params: IPromotionParamSearch = { page, limit };

    if (typeof filter?.value !== 'undefined' && filter.value?.length > 0) {
      const query = filter.filterBy === 'value' ? parseFloat(filter.value) : filter.value.toLowerCase();

      params = {
        ...params,
        [filter.filterBy]: query,
      }
    }

    const xhr = await httpClient.get('/promotions', { params }).then(({ data }) => {
      return {
        promotions: data.segments,
        ...data,
      };
    });

    return xhr;
  }

  public static async getById(promotionId: string): Promise<IPromotion> {
    const xhr = await httpClient.get(`promotions/${promotionId}`).then(({ data }) => data.promotion);

    return xhr;
  }

  public static async store(promotion: IPromotion): Promise<IPromotion> {
    const xhr = await httpClient.post('promotions', { ...promotion }).then(({ data }) => data.promotion);

    return xhr;
  }

  public static async update(promotion: IPromotion): Promise<IPromotion> {
    const xhr = await httpClient.put(`promotions/${promotion._id}`, { ...promotion }).then(({ data }) => data.segment);

    return xhr;
  }

  public static async remove(id: string): Promise<void> {
    await httpClient.delete(`/promotions/${id}`);
  }
}

export default PromotionService;
