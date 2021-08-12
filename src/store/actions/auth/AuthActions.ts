import { Dispatch } from 'redux';
import IAuth from '../../../app/contracts/auth/IAuth';
import ICredentials from '../../../app/contracts/auth/ICredentials';
import { HttpHelper, LocalStorageHelper } from '../../../app/helpers';
import AuthService from '../../../app/services/auth/AuthService';
import {
  StartLoginAction,
  SetAuthInfoAction,
  AUTH_ACTION_TYPES,
  CheckForUserAuthenticationAction,
  ResetAuthenticationAction,
  StartLogoutAction,
} from '../../types/auth/AuthTypes';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setFinishedRequestDispatcher, setRunningRequestDispatcher } from '../httpRequest/HttpRequestActions';

export const startAuthDispatcher = (): StartLoginAction => ({
  type: 'START_AUTH',
});

export const startLogoutDispatcher = (): StartLogoutAction => ({
  type: 'LOGOUT',
});

export const setAuthDispatcher = (auth: IAuth): SetAuthInfoAction => ({
  type: 'SET_AUTH_INFO',
  payload: auth,
});

export const resetAuthenticationDispatcher = (): ResetAuthenticationAction => ({
  type: 'RESET_AUTHENTICATION',
});

export const checkForAuthenticationDispatcher = (): CheckForUserAuthenticationAction => ({
  type: 'CHECK_FOR_AUTHENTICATION',
});

export const startAuthAction = (credentials: ICredentials) => {
  return async (dispatch: Dispatch<AUTH_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(startAuthDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const auth = await AuthService.authenticate(credentials);

      dispatch(setAuthDispatcher(auth));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startCheckForAuthenticationAction = () => {
  return async (dispatch: Dispatch<AUTH_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(checkForAuthenticationDispatcher());

    const token = LocalStorageHelper.getToken();
    const user = LocalStorageHelper.getAuthenticatedUser();

    if (token === null || user === null) {
      dispatch(resetAuthenticationDispatcher());

      return;
    }

    dispatch(setAuthDispatcher({ user, token }));
  }
}

export const startLogoutAction = () => {
  return async (dispatch: Dispatch<AUTH_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(startLogoutDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      await AuthService.logout();

      dispatch(resetAuthenticationDispatcher());
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}