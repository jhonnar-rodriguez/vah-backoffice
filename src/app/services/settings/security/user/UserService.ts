import httpClient from "../../../../../config/axios";
import IHttpResponseStatus from "../../../../contracts/httpRequest/IHttpResponseStatus";
import IChangeUserPassword from "../../../../contracts/security/user/IChangeUserPassword";
import IUser from "../../../../contracts/security/user/IUser";

class UserService {
  public static async getAll(): Promise<IUser[]> {
    const xhr = await httpClient.get('/user').then(({ data }) => data.users);

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
