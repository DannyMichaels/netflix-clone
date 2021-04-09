import {
  ADD_PROFILE,
  FETCH_PROFILES,
  REMOVE_PROFILE,
  UPDATE_PROFILE,
} from './profilesReducerTypes';

export const profilesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROFILES:
      return { ...state, profiles: payload, profilesAreLoading: false };

    case ADD_PROFILE:
      const newProfiles = { ...state, profiles: [...state.profiles, payload] };
      localStorage.setItem('profiles', JSON.stringify(newProfiles));
      return newProfiles;

    case UPDATE_PROFILE:
      const updatedProfiles = {
        ...state,
        profiles: state.profiles?.map((user) =>
          user.id === String(payload.id) ? payload : user
        ),
      };

      localStorage.setItem('profiles', JSON.parse(updatedProfiles));

      console.log({ updatedProfiles });
      return updatedProfiles;

    case REMOVE_PROFILE:
      const filteredProfiles = {
        ...state,
        profiles: state.profiles.filter(
          (user) => user.id !== String(payload.id)
        ),
      };

      localStorage.setItem('profiles', JSON.stringify(filteredProfiles));
      return filteredProfiles;

    default:
      return state;
  }
};
