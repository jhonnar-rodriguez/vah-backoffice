import { DEFAULT_ROWS_PER_PAGE } from "../../../../../config/app";
import httpClient from "../../../../../config/axios";
import IBaseFilter from "../../../../contracts/filter/IBaseFilter";
import IProcessFilter from "../../../../contracts/filter/IProcessFilter";
import IHttpResponseStatus from "../../../../contracts/httpRequest/IHttpResponseStatus";
import IChangeUserPassword from "../../../../contracts/security/user/IChangeUserPassword";
import IUser from "../../../../contracts/security/user/IUser";
import IUsersPaginated from "../../../../contracts/security/user/table/IUsersPaginated";

class UserService {
  public static async getAll(filter?: IProcessFilter): Promise<IUsersPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filter || {};
    let params: IBaseFilter = { page, limit };

    if (typeof filter?.value !== 'undefined' && filter.value?.length > 0) {
      const query = filter.value.toLowerCase();

      params = {
        ...params,
        [filter.filterBy]: query,
      }
    }

    const xhr = await httpClient.get('/user', { params }).then(({ data }) => {
      return {
        users: data.users,
        ...data,
      }
    });

    return xhr;
  }

  public static async getById(userId: string): Promise<IUser> {
    const xhr = await httpClient.get(`user/${userId}`).then(({ data }) => data.user);

    return xhr;
  }

  public static async store(user: IUser): Promise<IUser> {
    const xhr = await httpClient.post("user", { ...user }).then(({ data }) => data.user);

    return xhr;
  }

  public static async update(user: IUser): Promise<IUser> {
    const xhr = await httpClient.put(`user/${user._id}`, { ...user }).then(({ data }) => data.user);

    return xhr;
  }

  public static async remove(id: string): Promise<void> {
    await httpClient.delete(`/user/${id}`);
  }

  public static async changePassword(user: IChangeUserPassword): Promise<IHttpResponseStatus> {
    delete user.name;

    const xhr = await httpClient.put(`/user/${user._id}/password`, { ...user }).then(({ data }) => data.status);

    return xhr;
  }
}

export default UserService;
