import { DEFAULT_ROWS_PER_PAGE } from '../../../config/app';
import httpClient from '../../../config/axios';
import IBaseFilter from '../../contracts/filter/IBaseFilter';
import IProcessFilter from '../../contracts/filter/IProcessFilter';
import IAllowedClient from '../../contracts/security/allowedClient/IAllowedClient';
import IAllowedClientsPaginated from '../../contracts/security/allowedClient/table/IAllowedClientsPaginated';

class AllowedClientService {
  public static async getAll(filter?: IProcessFilter): Promise<IAllowedClientsPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filter || {};
    let params: IBaseFilter = { page, limit };

    if (typeof filter?.value !== 'undefined' && filter.value?.length > 0) {
      const query = filter.value.toLowerCase();

      params = {
        ...params,
        [filter.filterBy]: query,
      }
    }

    const xhr = await httpClient.get('/client', { params }).then(({ data }) => {
      return {
        coupons: data.clients,
        ...data,
      }
    });

    return xhr;
  }

  public static async store(client: IAllowedClient): Promise<IAllowedClient> {
    const xhr = await httpClient.post("/client", { ...client }).then(({ data }) => data.client);

    return xhr;
  }

  public static async update(client: IAllowedClient): Promise<IAllowedClient> {
    const xhr = await httpClient.put(`/client/${client._id}`, { ...client }).then(({ data }) => data.client);

    return xhr;
  }

  public static async remove(clientId: string): Promise<void> {
    await httpClient.delete(`/client/${clientId}`);
  }
}

export default AllowedClientService;
