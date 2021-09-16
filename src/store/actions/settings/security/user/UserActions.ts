import { Dispatch } from 'redux';
import { setFinishedRequestDispatcher } from './../../../httpRequest/HttpRequestActions';
import IUser from '../../../../../app/contracts/security/user/IUser';
import { setRunningRequestDispatcher } from '../../../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../../../app/helpers';
import { HTTP_REQUEST_ACTION_TYPES } from '../../../../types/httpRequest/HttpRequestTypes';
import { usersInitialState } from '../../../../../app/data/security/user';
import UserService from '../../../../../app/services/settings/security/user/UserService';
import {
  SetUserAction,
  SetUsersAction,
  GetUsersAction,
  UpdateUserAction,
  CreateUserAction,
  RemoveUserAction,
  USER_ACTION_TYPES,
  ChangeUserPasswordAction,
} from '../../../../types/settings/security/user/UserTypes';
import IHttpRequestHandler from '../../../../../app/contracts/httpRequest/IHttpRequest';
import IChangeUserPassword from '../../../../../app/contracts/security/user/IChangeUserPassword';

export const getUsersDispatcher = (): GetUsersAction => ({
  type: 'GET_USERS',
});

export const setUsersDispatcher = (users: IUser[]): SetUsersAction => ({
  type: 'SET_USERS',
  payload: users,
});

export const createUserDispatcher = (user: IUser): CreateUserAction => ({
  type: 'CREATE_USER',
  payload: user,
});

export const updateUserDispatcher = (user: IUser): UpdateUserAction => ({
  type: 'UPDATE_USER',
  payload: user,
});

export const removeUserDispatcher = (userId: string): RemoveUserAction => ({
  type: 'REMOVE_USER',
  payload: userId,
});

export const setUserAction = (user: IUser): SetUserAction => ({
  type: 'SET_USER',
  payload: user,
});

export const changeUserPasswordDispatcher = (): ChangeUserPasswordAction => ({
  type: 'CHANGE_USER_PASSWORD',
});

export const startGetUsersAction = () => {
  return async (dispatch: Dispatch<USER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getUsersDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const users = await UserService.getAll();

      dispatch(setUsersDispatcher(users));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startCreateUserAction = (user: IUser) => {
  return async (dispatch: Dispatch<USER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequestHandler = {
      isLoading: false,
    };

    try {
      const newUser = await UserService.store(user);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: "El usuario ha sido creado satisfactoriamente.",
          statusCode: 201,
          statusText: "Created",
        }
      }

      dispatch(createUserDispatcher(newUser));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startUpdateUserAction = (user: IUser) => {
  return async (dispatch: Dispatch<USER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const updatedUser = await UserService.update(user);

      dispatch(updateUserDispatcher(updatedUser));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateSuccessResponse({ action: "actualizado" })));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startRemoveUserAction = (userId: string) => {
  return async (dispatch: Dispatch<USER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());


    let requestFinishedPayload: IHttpRequestHandler = {
      isLoading: false,
    };

    try {
      await UserService.remove(userId);

      requestFinishedPayload = {
        ...requestFinishedPayload,
        success: {
          message: "El usuario ha sido eliminado satisfactoriamente.",
          statusCode: 200,
          statusText: "Deleted",
        }
      }

      dispatch(removeUserDispatcher(userId));
    } catch ({ response }) {
      requestFinishedPayload = HttpHelper.formatRequestFinishedResponse(response);
    }

    dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
  }
}

export const startGetUserAction = (userId: string) => {
  return async (dispatch: Dispatch<USER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    try {
      const user = await UserService.getById(userId);

      dispatch(setUserAction(user));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setUserAction(usersInitialState));
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}

export const startChangeUserPasswordAction = (user: IChangeUserPassword) => {
  return async (dispatch: Dispatch<USER_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequestHandler = {
      isLoading: false,
    };

    try {
      const response = await UserService.changePassword(user);

      let message = 'Ha ocurrido un error al realizar la petición, por favor intente de nuevo.';
      let statusCode = 422;
      let statusText = 'Error';
      let responseKey = 'success';

      if (response.status === 'OK') {
        message = "La contraseña se ha actualizado satisfactoriamente.";
        statusCode = 200;
        statusText = "Actualizado";
      }

      requestFinishedPayload = {
        ...requestFinishedPayload,
        [responseKey]: {
          message,
          statusCode,
          statusText,
        }
      }

      dispatch(changeUserPasswordDispatcher());
      dispatch(setFinishedRequestDispatcher(requestFinishedPayload));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
