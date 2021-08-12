import { Dispatch } from 'redux';
import { setFinishedRequestDispatcher } from './../../../httpRequest/HttpRequestActions';
import { setRunningRequestDispatcher } from '../../../httpRequest/HttpRequestActions';
import { HttpHelper } from '../../../../../app/helpers';
import { HTTP_REQUEST_ACTION_TYPES } from '../../../../types/httpRequest/HttpRequestTypes';
import { GetRolesAction, ROLE_ACTION_TYPES, SetRolesAction } from '../../../../types/settings/security/role/RoleTypes';
import IRole from '../../../../../app/contracts/security/role/IRole';
import RoleService from '../../../../../app/services/settings/security/role/RoleService';

export const getRolesDispatcher = (): GetRolesAction => ({
  type: 'GET_ROLES',
});

export const setRolesDispatcher = (roles: IRole[]): SetRolesAction => ({
  type: 'SET_ROLES',
  payload: roles,
});

export const startGetRolesAction = () => {
  return async (dispatch: Dispatch<ROLE_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getRolesDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const roles = await RoleService.getAll();

      dispatch(setRolesDispatcher(roles));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
