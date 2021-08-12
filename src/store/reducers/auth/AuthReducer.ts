import IAuth from '../../../app/contracts/auth/IAuth';
import { authInitialState } from './../../../app/data/auth/index';
import {
  START_AUTH,
  SET_AUTH_INFO,
  AUTH_ACTION_TYPES,
  RESET_AUTHENTICATION,
} from '../../types/auth/AuthTypes';
import { LocalStorageHelper } from '../../../app/helpers';

interface IAuthReducer {
  auth: IAuth,
  token: string,
  loadingUser: boolean,
  isAuthenticated: boolean,
};

const initialState: IAuthReducer = {
  auth: authInitialState,
  token: "",
  loadingUser: true,
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action: AUTH_ACTION_TYPES): IAuthReducer => {
  switch (action.type) {
    case START_AUTH:
      return {
        ...state,
      }

    case SET_AUTH_INFO:
      LocalStorageHelper.setToken(action.payload.token);
      LocalStorageHelper.setUser(action.payload.user);

      return {
        ...state,
        auth: {
          ...action.payload,
        },
        token: action.payload.token,
        loadingUser: false,
        isAuthenticated: true,
      }

    case RESET_AUTHENTICATION:
      LocalStorageHelper.removeAuthenticationKeys();

      return {
        ...state,
        auth: authInitialState,
        token: "",
        loadingUser: false,
        isAuthenticated: false,
      }

    default:
      return state;
  }
}

export default AuthReducer;
