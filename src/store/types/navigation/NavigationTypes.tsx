export const GET_NAVIGATION = 'GET_NAVIGATION';
export const SET_NAVIGATION = 'SET_NAVIGATION';

export interface SetNavigationAction {
  type: typeof SET_NAVIGATION,
  payload: string,
}

export interface GetNavigationAction {
  type: typeof GET_NAVIGATION,
}

export type NAVIGATION_ACTION_TYPES = SetNavigationAction | GetNavigationAction;
