import httpClient from "../../../config/axios";
import IHttpResponseStatus from "../../contracts/httpRequest/IHttpResponseStatus";
import IChangeUserPassword from "../../contracts/security/user/IChangeUserPassword";

class ProfileService {
  public static async changePassword(user: IChangeUserPassword): Promise<IHttpResponseStatus> {
    const formattedParams = {
      password: user.password,
      old_password: user.old_password,
      password_confirmation: user.password_confirmation,
    };

    const xhr = await httpClient.put(`/profile/${user._id}/password`, formattedParams).then(({ data }) => data.status);

    return xhr;
  }
}

export default ProfileService;
