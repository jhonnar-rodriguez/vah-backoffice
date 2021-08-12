import IAuth from "../../contracts/auth/IAuth";

export const authInitialState: IAuth = {
  user: {
    _id: "",
    name: "",
    lastname: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    role: {
      _id: "",
      name: "",
    },
    active: false,
  },
  token: "",
};
