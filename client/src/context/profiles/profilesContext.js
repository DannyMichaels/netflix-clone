import React, { useMemo, createContext, useReducer } from 'react';

// utils
import { getRandomId } from '../../utils/generateId';

// reducer
import { profilesReducer } from './profilesReducer';
import { FETCH_PROFILES } from './profilesReducerTypes';

export const ProfilesStateContext = createContext();
export const ProfilesDispatchContext = createContext();

export default function ProfilesContextProvider({ children }) {
  const initialProfilesState = [
    {
      id: getRandomId(100),
      name: 'guest',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
      isKid: false,
      list: [],
    },
  ];

  const [state, dispatch] = useReducer(profilesReducer, initialProfilesState);

  useMemo(async () => {
    const storedProfiles = localStorage.getItem('profiles');
    if (storedProfiles !== null) {
      return dispatch({
        type: FETCH_PROFILES,
        payload: JSON.parse(storedProfiles),
      });
    }

    localStorage.setItem('profiles', JSON.stringify(initialProfilesState));
    return dispatch({
      type: FETCH_PROFILES,
      payload: initialProfilesState,
    });

    //eslint-disable-next-line
  }, []);

  return (
    <ProfilesStateContext.Provider value={state}>
      <ProfilesDispatchContext.Provider value={dispatch}>
        {children}
      </ProfilesDispatchContext.Provider>
    </ProfilesStateContext.Provider>
  );
}
