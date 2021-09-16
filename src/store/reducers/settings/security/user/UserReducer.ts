import IUser from '../../../../../app/contracts/security/user/IUser';
import { usersInitialState } from '../../../../../app/data/security/user';
import {
  SET_USER,
  GET_USERS,
  SET_USERS,
  CREATE_USER,
  UPDATE_USER,
  REMOVE_USER,
  USER_ACTION_TYPES,
  CHANGE_USER_PASSWORD,
} from '../../../../types/settings/security/user/UserTypes';

interface IUserReducer {
  list: IUser[],
  user: IUser,
};

const initialState: IUserReducer = {
  list: [],
  user: usersInitialState,
};

const UserReducer = (state = initialState, action: USER_ACTION_TYPES): IUserReducer => {
  switch (action.type) {
    case GET_USERS:
    case CHANGE_USER_PASSWORD:
      return {
        ...state,
      }

    case SET_USERS:
      return {
        ...state,
        list: [
          ...action.payload,
        ],
      }

    case SET_USER:
      return {
        ...state,
        user: { ...action.payload },
      }

    case CREATE_USER:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
          },
        ],
      }

    case UPDATE_USER:
      let updatedElementIndex = state.list.findIndex((user: IUser) => user._id === action.payload._id);
      let updatedUser = [...state.list];
      updatedUser[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        list: updatedUser,
      }

    case REMOVE_USER:
      return {
        ...state,
        list: [
          ...state.list.filter((user: IUser) => user._id !== action.payload),
        ],
      }

    default:
      return state;
  }
}

export default UserReducer;
