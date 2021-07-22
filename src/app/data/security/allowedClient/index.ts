import IAllowedClient from "../../../contracts/security/allowedClient/IAllowedClient";

export const allowedClientsInitialState: IAllowedClient = {
  _id: "",
  name: "",
  secret: "",
  provider: "",
  url: "",
  notificationUrl: "",
  revoked: false,
};
