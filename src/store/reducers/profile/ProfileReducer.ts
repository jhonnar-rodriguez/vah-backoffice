import { CHANGE_PASSWORD, PROFILE_ACTION_TYPES } from '../../types/profile/ProfileTypes';

interface IProfileReducer {
  passwordChanged: boolean,
};

const initialState: IProfileReducer = {
  passwordChanged: true,
};

const ProfileReducer = (state = initialState, action: PROFILE_ACTION_TYPES): IProfileReducer => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
      }

    default:
      return state;
  }
}

export default ProfileReducer;
