import { Dispatch } from 'redux';
import {
  HTTP_REQUEST_ACTION_TYPES,
  HttpResetStateAction,
  HttpSetRunningRequestAction,
  HttpSetFinishedRequestAction,
} from '../../types/httpRequest/HttpRequestTypes';

import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';

export const setResetStateActionDispatcher = (): HttpResetStateAction => ({
  type: 'HTTP_RESET_STATE',
});

export const setRunningRequestDispatcher = (): HttpSetRunningRequestAction => ({
  type: 'HTTP_REQUEST_RUNNING',
});

export const setFinishedRequestDispatcher = (payload: IHttpRequest): HttpSetFinishedRequestAction => ({
  type: 'HTTP_REQUEST_FINISHED',
  payload,
});

export const startRunningRequestAction = () => {
  return async (dispatch: Dispatch<HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());
  }
};

export const startFinishedRequestAction = (payload: IHttpRequest) => {
  return async (dispatch: Dispatch<HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setFinishedRequestDispatcher(payload));
  }
};

export const startResetStateAction = () => {
  return async (dispatch: Dispatch<HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setResetStateActionDispatcher());
  }
};
