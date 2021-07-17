import INavigation from '../../../app/contracts/navigation/INavigation';
import {
  GET_NAVIGATION,
  SET_NAVIGATION,
  NAVIGATION_ACTION_TYPES,
} from '../../types/navigation/NavigationTypes';

const initialState: INavigation = {
  title: "",
};

const NavigationReducer = (state = initialState, action: NAVIGATION_ACTION_TYPES): INavigation => {
  switch (action.type) {
    case GET_NAVIGATION:
      return {
        ...state,
      }

    case SET_NAVIGATION:
      return {
        ...state,
        title: action.payload,
      }

    default:
      return state;
  }
}

export default NavigationReducer;
