import IUser from "../../../../../app/contracts/security/user/IUser";

export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';

export const SET_USER = 'SET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export interface GetUsersAction {
  type: typeof GET_USERS,
};

export interface SetUsersAction {
  type: typeof SET_USERS,
  payload: IUser[],
};

export interface SetUserAction {
  type: typeof SET_USER,
  payload: IUser,
};

export interface CreateUserAction {
  type: typeof CREATE_USER,
  payload: IUser,
};

export interface UpdateUserAction {
  type: typeof UPDATE_USER,
  payload: IUser,
};

export interface RemoveUserAction {
  type: typeof REMOVE_USER,
  payload: string,
};

export type USER_ACTION_TYPES = GetUsersAction |
  CreateUserAction |
  SetUsersAction |
  SetUserAction |
  UpdateUserAction |
  RemoveUserAction;
