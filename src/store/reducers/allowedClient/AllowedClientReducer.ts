import IAllowedClient from '../../../app/contracts/security/allowedClient/IAllowedClient';
import {
  SET_CLIENTS,
  GET_CLIENTS,
  CREATE_CLIENT,
  REMOVE_CLIENT,
  UPDATE_CLIENT,
  ALLOWED_CLIENT_ACTION_TYPES,
} from '../../types/allowedClient/AllowedClientTypes';

interface IAllowedClientReducer {
  list: IAllowedClient[],
};

const initialState: IAllowedClientReducer = {
  list: [],
};

const AllowedClientReducer = (state = initialState, action: ALLOWED_CLIENT_ACTION_TYPES): IAllowedClientReducer => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
      }

    case SET_CLIENTS:
      return {
        ...state,
        list: [
          ...action.payload,
        ],
      }

    case CREATE_CLIENT:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload,
          },
        ],
      }

    case UPDATE_CLIENT:
      let updatedElementIndex = state.list.findIndex((client: IAllowedClient) => client._id === action.payload._id);
      let updatedClient = [...state.list];
      updatedClient[updatedElementIndex] = { ...action.payload };

      return {
        ...state,
        list: updatedClient,
      }

    case REMOVE_CLIENT:
      return {
        ...state,
        list: [
          ...state.list.filter((client: IAllowedClient) => client._id !== action.payload),
        ],
      }

    default:
      return state;
  }
}

export default AllowedClientReducer;
