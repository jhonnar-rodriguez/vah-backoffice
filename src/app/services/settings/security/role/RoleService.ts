import httpClient from "../../../../../config/axios";
import IRole from "../../../../contracts/security/role/IRole";

class RoleService {
  public static async getAll(): Promise<IRole[]> {
    const xhr = await httpClient.get('/role').then(({ data }) => data.roles);

    return xhr;
  }
}

export default RoleService;
