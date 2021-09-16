import IChangeUserPassword from "../../../contracts/security/user/IChangeUserPassword";
import IUser from "../../../contracts/security/user/IUser";

export const usersInitialState: IUser = {
  _id: "",
  name: "",
  lastname: "",
  email: "",
  mobile: "",
  username: "",
  password: "",
  password_confirmation: "",
  role: {
    _id: " ",
    name: "",
  },
  active: false,
};

export const changeUserPasswordInitialState: IChangeUserPassword = {
  _id: "",
  name: "",
  password: "",
  password_confirmation: "",
};
