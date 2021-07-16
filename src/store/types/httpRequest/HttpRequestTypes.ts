import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';

export const HTTP_RESET_STATE = 'HTTP_RESET_STATE';
export const HTTP_REQUEST_RUNNING = 'HTTP_REQUEST_RUNNING';
export const HTTP_REQUEST_FINISHED = 'HTTP_REQUEST_FINISHED';

export interface HttpSetRunningRequestAction {
  type: typeof HTTP_REQUEST_RUNNING,
}

export interface HttpSetFinishedRequestAction {
  type: typeof HTTP_REQUEST_FINISHED,
  payload: IHttpRequest,
}

export interface HttpResetStateAction {
  type: typeof HTTP_RESET_STATE,
}

export type HTTP_REQUEST_ACTION_TYPES = HttpSetRunningRequestAction | HttpSetFinishedRequestAction | HttpResetStateAction;
