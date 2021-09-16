interface IChangeUserPassword {
  _id: string,
  name?: string;
  password: string;
  password_confirmation: string,
}

export default IChangeUserPassword;
