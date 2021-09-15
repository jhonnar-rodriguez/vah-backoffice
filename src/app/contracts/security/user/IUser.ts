import IRole from "../role/IRole";

interface IUser {
  _id: string,
  name: string;
  lastname: string;
  email: string;
  mobile: string;
  username: string;
  password?: string;
  password_confirmation?: string,
  role: IRole;
  active: boolean;
}

export default IUser;
