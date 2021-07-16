export interface IRequestHandler {
  message: string,
  statusText: string,
  statusCode: number,
}

interface IHttpRequestHandler {
  isLoading: boolean,
  error?: IRequestHandler,
  success?: IRequestHandler,
  resetReducerState?: Function,
};

export default IHttpRequestHandler;
