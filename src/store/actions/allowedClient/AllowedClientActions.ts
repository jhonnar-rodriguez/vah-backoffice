import { Dispatch } from 'redux';
import { HTTP_REQUEST_ACTION_TYPES } from '../../types/httpRequest/HttpRequestTypes';
import { setRunningRequestDispatcher, setFinishedRequestDispatcher } from '../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../app/helpers';
import IAllowedClient from '../../../app/contracts/security/allowedClient/IAllowedClient';
import {
  GetClientsAction,
  SetClientsAction,
  RemoveClientAction,
  CreateClientAction,
  UpdateClientAction,
  ALLOWED_CLIENT_ACTION_TYPES,
} from '../../types/allowedClient/AllowedClientTypes';
import AllowedClientService from '../../../app/services/allowedClient/AllowedClientService';
import IProcessFilter from '../../../app/contracts/filter/IProcessFilter';
import IAllowedClientsPaginated from '../../../app/contracts/security/allowedClient/table/IAllowedClientsPaginated';

export const getClientsDispatcher = (): GetClientsAction => ({
  type: 'GET_CLIENTS',
});

export const setClientsDispatcher = (clients: IAllowedClientsPaginated): SetClientsAction => ({
  type: 'SET_CLIENTS',
  payload: clients,
});

export const createClientDispatcher = (client: IAllowedClient): CreateClientAction => ({
  type: 'CREATE_CLIENT',
  payload: client,
});

export const updateClientDispatcher = (client: IAllowedClient): UpdateClientAction => ({
  type: 'UPDATE_CLIENT',
  payload: client,
});

export const removeClientDispatcher = (clientId: string): RemoveClientAction => ({
  type: 'REMOVE_CLIENT',
  payload: clientId,
});

export const startGetClientsAction = (filter?: IProcessFilter) => {
  return async (dispatch: Dispatch<ALLOWED_CLIENT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getClientsDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const clients = await AllowedClientService.getAll(filter);

      dispatch(setClientsDispatcher(clients));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startCreateClientAction = (client: IAllowedClient) => {
  return async (dispatch: Dispatch<ALLOWED_CLIENT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const createdClient = await AllowedClientService.store(client);

      dispatch(createClientDispatcher(createdClient));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ statusCode: 201 })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startUpdateClientAction = (client: IAllowedClient) => {
  return async (dispatch: Dispatch<ALLOWED_CLIENT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const updatedClient = await AllowedClientService.update(client);

      dispatch(updateClientDispatcher(updatedClient));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "actualizado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startRemoveClientAction = (clientId: string) => {
  return async (dispatch: Dispatch<ALLOWED_CLIENT_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      await AllowedClientService.remove(clientId);

      dispatch(removeClientDispatcher(clientId));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "eliminado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
