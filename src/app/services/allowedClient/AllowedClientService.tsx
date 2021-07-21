import axios from 'axios';
import { BACKEND_URL } from '../../../config/app';
import IAllowedClient from '../../contracts/allowedClient/IAllowedClient';

const httpClient = axios.create({
  baseURL: BACKEND_URL,
});

class AllowedClientService {
  public static async getAll(): Promise<IAllowedClient[]> {
    const xhr = await httpClient.get('/client').then(({ data }) => data.clients);

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
