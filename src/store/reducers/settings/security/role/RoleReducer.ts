import IRole from '../../../../../app/contracts/security/role/IRole';
import { GET_ROLES, SET_ROLES, ROLE_ACTION_TYPES } from '../../../../types/settings/security/role/RoleTypes';


interface IRoleReducer {
  list: IRole[],
};

const initialState: IRoleReducer = {
  list: [],
};

const UserReducer = (state = initialState, action: ROLE_ACTION_TYPES): IRoleReducer => {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
      }

    case SET_ROLES:
      return {
        ...state,
        list: [
          ...action.payload,
        ],
      }

    default:
      return state;
  }
}

export default UserReducer;
