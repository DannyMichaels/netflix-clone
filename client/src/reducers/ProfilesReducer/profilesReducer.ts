import { Profile, ProfilesState } from '../../types/profile';
import {
  ADD_PROFILE,
  FETCH_PROFILES,
  REMOVE_PROFILE,
  UPDATE_PROFILE,
  SELECT_PROFILE,
  SIGN_OUT,
} from './profilesReducerTypes';

interface Action {
  type:
    | typeof ADD_PROFILE
    | typeof FETCH_PROFILES
    | typeof REMOVE_PROFILE
    | typeof UPDATE_PROFILE
    | typeof SELECT_PROFILE
    | typeof SIGN_OUT;
  payload: any;
}

const getCurrentProfile = (state: ProfilesState) => {
  const selectedProfile = localStorage.getItem('currentProfile');
  const parsedProfile: Profile = selectedProfile && JSON.parse(selectedProfile);

  if (parsedProfile !== null) {
    return parsedProfile;
  }

  const defaultProfile = state.profiles.find((_, idx) => idx === 0);

  return defaultProfile;
};

export const profilesReducer = (state: ProfilesState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILES:
      return {
        ...state,
        profiles: payload,
        profilesAreLoading: false,
        maxProfileLength: 5,
        currentProfile: getCurrentProfile(state),
      };

    case ADD_PROFILE:
      const newProfiles = [...state.profiles, payload];

      return { ...state, profiles: newProfiles };

    case UPDATE_PROFILE:
      const updatedProfiles = state.profiles.map((user) =>
        String(user.id) === String(payload.id) ? payload : user
      );

      if (payload?.id === state.currentProfile?.id) {
        return { ...state, profiles: updatedProfiles, currentProfile: payload };
      }
      return { ...state, profiles: updatedProfiles };

    case REMOVE_PROFILE:
      const filteredProfiles = state.profiles.filter(
        (user) => String(user.id) !== String(payload.id)
      );

      if (payload?.id === state.currentProfile?.id) {
        return { ...state, profiles: filteredProfiles, currentProfile: null };
      }

      return { ...state, profiles: filteredProfiles };

    case SELECT_PROFILE:
      const newSelectedState = { ...state, currentProfile: payload };
      localStorage.setItem('profiles', JSON.stringify(newSelectedState));
      return newSelectedState;

    case SIGN_OUT:
      return { ...state, currentProfile: null };

    default:
      return state;
  }
};
