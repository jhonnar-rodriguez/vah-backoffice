import { paginationInitialState } from './../../data/general/pagination/index';
import { promotionMock } from './../../data/promotions/index';
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

    return {
      promotions: promotionMock,
      ...paginationInitialState,
      totalItems: 4,
      page: 1,
      limit: 2,
    };

    // const xhr = await httpClient.get('/promotion', { params }).then(({ data }) => {
    //   return {
    //     promotions: data.promotions,
    //     ...data,
    //   };
    // });

    // return xhr;
  }

  public static async getById(promotionId: string): Promise<IPromotion> {
    const xhr = await httpClient.get(`promotion/${promotionId}`).then(({ data }) => data.promotion);

    return xhr;
  }

  public static async store(promotion: IPromotion): Promise<IPromotion> {
    const xhr = await httpClient.post('promotion', { ...promotion }).then(({ data }) => data.promotion);

    return xhr;
  }

  public static async update(promotion: IPromotion): Promise<IPromotion> {
    const xhr = await httpClient.put(`promotion/${promotion._id}`, { ...promotion }).then(({ data }) => data.promotion);

    return xhr;
  }

  public static async remove(id: string): Promise<void> {
    await httpClient.delete(`/promotion/${id}`);
  }
}

export default PromotionService;
