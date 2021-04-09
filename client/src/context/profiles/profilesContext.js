import React, { useMemo, createContext, useReducer, useRef } from 'react';

// utils
import { getRandomId } from '../../utils/generateId';

// reducer
import { profilesReducer } from '../../reducers/ProfilesReducer/profilesReducer';
import { FETCH_PROFILES } from '../../reducers/ProfilesReducer/profilesReducerTypes';

export const ProfilesStateContext = createContext();
export const ProfilesDispatchContext = createContext();

export default function ProfilesContextProvider({ children }) {
  const initialProfilesState = {
    profiles: [
      {
        id: getRandomId(100),
        name: 'guest',
        imgUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
        isKid: false,
        language: 'English',
        list: [],
      },
    ],
    currentProfile: {},
    profilesAreLoading: true,
  };

  const [state, dispatch] = useReducer(profilesReducer, initialProfilesState);

  const defaultState = useRef(initialProfilesState);

  useMemo(async () => {
    const storedProfiles = localStorage.getItem('profiles');
    if (storedProfiles !== null) {
      return dispatch({
        type: FETCH_PROFILES,
        payload: JSON.parse(storedProfiles),
      });
    }

    localStorage.setItem(
      'profiles',
      JSON.stringify(defaultState.current.profiles)
    );

    return dispatch({
      type: FETCH_PROFILES,
      payload: defaultState.current.profiles,
    });
  }, []);

  return (
    <ProfilesStateContext.Provider value={state}>
      <ProfilesDispatchContext.Provider value={dispatch}>
        {children}
      </ProfilesDispatchContext.Provider>
    </ProfilesStateContext.Provider>
  );
}
