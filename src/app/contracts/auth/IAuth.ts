import IUser from "../security/user/IUser";

interface IAuth {
  user: IUser,
  token: string,
};

export default IAuth;
