import IRole from "../../../../../app/contracts/security/role/IRole";

export const GET_ROLES = 'GET_ROLES';
export const SET_ROLES = 'SET_ROLES';

export interface GetRolesAction {
  type: typeof GET_ROLES,
};

export interface SetRolesAction {
  type: typeof SET_ROLES,
  payload: IRole[],
};

export type ROLE_ACTION_TYPES = GetRolesAction | SetRolesAction;
