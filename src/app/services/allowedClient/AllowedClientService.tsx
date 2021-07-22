import axios from 'axios';
import IAllowedClient from '../../contracts/security/allowedClient/IAllowedClient';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
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
