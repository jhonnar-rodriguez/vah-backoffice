interface IAllowedClient {
  _id: string,
  url: string,
  name: string,
  secret: string,
  revoked: boolean,
  provider: string,
  notificationUrl: string,
};

export default IAllowedClient;
