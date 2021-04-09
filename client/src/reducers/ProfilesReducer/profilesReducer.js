import {
  ADD_PROFILE,
  FETCH_PROFILES,
  REMOVE_PROFILE,
  UPDATE_PROFILE,
  SELECT_PROFILE,
  SIGN_OUT,
} from './profilesReducerTypes';

const getCurrentProfile = (state) => {
  const selectedProfile = localStorage.getItem('selectedProfile');
  const parsedProfile = JSON.parse(selectedProfile);

  if (parsedProfile !== null) {
    return JSON.parse(selectedProfile);
  }

  const defaultProfile = state.profiles.find((_, idx) => idx === 0);
  localStorage.setItem('selectedProfile', JSON.stringify(defaultProfile));
  return defaultProfile;
};

export const profilesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILES:
      return {
        ...state,
        profiles: payload,
        profilesAreLoading: false,
        currentProfile: getCurrentProfile(state),
      };

    case ADD_PROFILE:
      const newProfiles = [...state.profiles, payload];
      localStorage.setItem('profiles', JSON.stringify(newProfiles));

      return { ...state, profiles: newProfiles };

    case UPDATE_PROFILE:
      const updatedProfiles = state.profiles.map((user) =>
        user.id === String(payload.id) ? payload : user
      );

      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      return { ...state, profiles: updatedProfiles };

    case REMOVE_PROFILE:
      const filteredProfiles = state.profiles.filter(
        (user) => user.id !== String(payload.id)
      );

      localStorage.setItem('profiles', JSON.stringify(filteredProfiles));
      return { ...state, profiles: filteredProfiles };

    case SELECT_PROFILE:
      localStorage.setItem('selectedProfile', JSON.stringify(payload));
      return { ...state, currentProfile: payload };

    case SIGN_OUT:
      localStorage.setItem('selectedProfile', null);
      return { ...state, currentProfile: null };
    default:
      return state;
  }
};
