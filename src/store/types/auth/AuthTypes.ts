import IAuth from "../../../app/contracts/auth/IAuth";

export const START_AUTH = 'START_AUTH';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH_INFO = 'SET_AUTH_INFO';
export const RESET_AUTHENTICATION = 'RESET_AUTHENTICATION';
export const CHECK_FOR_AUTHENTICATION = 'CHECK_FOR_AUTHENTICATION';

export interface StartLoginAction {
  type: typeof START_AUTH,
};

export interface StartLogoutAction {
  type: typeof LOGOUT,
};

export interface SetAuthInfoAction {
  type: typeof SET_AUTH_INFO,
  payload: IAuth,
};

export interface ResetAuthenticationAction {
  type: typeof RESET_AUTHENTICATION,
}

export interface CheckForUserAuthenticationAction {
  type: typeof CHECK_FOR_AUTHENTICATION,
}

export type AUTH_ACTION_TYPES = StartLoginAction |
  StartLogoutAction |
  SetAuthInfoAction |
  ResetAuthenticationAction |
  CheckForUserAuthenticationAction;
