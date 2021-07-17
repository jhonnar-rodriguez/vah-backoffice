import { Dispatch } from 'redux';
import {
  GetNavigationAction,
  SetNavigationAction,
  NAVIGATION_ACTION_TYPES,
} from '../../types/navigation/NavigationTypes';

export const getNavigationDispatcher = (): GetNavigationAction => ({
  type: 'GET_NAVIGATION',
});

export const setNavigationDispatcher = (title: string): SetNavigationAction => ({
  type: 'SET_NAVIGATION',
  payload: title,
});

export const startSetNavigationAction = (title: string) => {
  return async (dispatch: Dispatch<NAVIGATION_ACTION_TYPES>) => {
    dispatch(setNavigationDispatcher(title));
  }
};
