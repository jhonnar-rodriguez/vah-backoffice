import IAllowedClient from "../../../app/contracts/security/allowedClient/IAllowedClient";
import IAllowedClientsPaginated from "../../../app/contracts/security/allowedClient/table/IAllowedClientsPaginated";

export const GET_CLIENTS = 'GET_CLIENTS';
export const SET_CLIENTS = 'SET_CLIENTS';

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';

export interface GetClientsAction {
  type: typeof GET_CLIENTS,
};

export interface SetClientsAction {
  type: typeof SET_CLIENTS,
  payload: IAllowedClientsPaginated,
};

export interface CreateClientAction {
  type: typeof CREATE_CLIENT,
  payload: IAllowedClient,
};

export interface UpdateClientAction {
  type: typeof UPDATE_CLIENT,
  payload: IAllowedClient,
};

export interface RemoveClientAction {
  type: typeof REMOVE_CLIENT,
  payload: string,
};

export type ALLOWED_CLIENT_ACTION_TYPES = GetClientsAction |
  SetClientsAction |
  RemoveClientAction |
  CreateClientAction |
  UpdateClientAction;
