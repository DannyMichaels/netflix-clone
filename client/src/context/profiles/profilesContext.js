import React, { createContext, useReducer, useRef, useEffect } from 'react';

// utils
import { getRandomId } from '../../utils/generateId';

// reducer
import { profilesReducer } from '../../reducers/ProfilesReducer/profilesReducer';
import { FETCH_PROFILES } from '../../reducers/ProfilesReducer/profilesReducerTypes';
import { IMAGES } from '../../utils/generalUtils';
import { merge } from 'lodash';

export const ProfilesStateContext = createContext();
export const ProfilesDispatchContext = createContext();

export default function ProfilesContextProvider({ children }) {
  const initialProfilesState = {
    profiles: [
      {
        id: getRandomId(100),
        name: 'Guest',
        imgUrl: IMAGES.BLUE_AVATAR,
        isKid: false,
        language: 'English',
        list: [],
      },
    ],
    maxProfilesLength: 4,
    currentProfile: null,
    profilesAreLoading: true,
  };

  const [state, dispatch] = useReducer(profilesReducer, initialProfilesState);

  const defaultState = useRef(initialProfilesState);

  useEffect(() => {
    const loadState = async () => {
      if (JSON.parse(localStorage.getItem('profiles') !== null)) {
        try {
          merge(state, JSON.parse(localStorage.getItem('profiles')));
        } catch (e) {
          console.error('ERROR:', e);
        }

        return state;
      } else {
        localStorage.setItem(
          'profiles',
          JSON.stringify(defaultState.current.profiles)
        );

        return dispatch({
          type: FETCH_PROFILES,
          payload: defaultState.current.profiles,
        });
      }
    };
    loadState();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(state));
  }, [state]);

  return (
    <ProfilesStateContext.Provider value={state}>
      <ProfilesDispatchContext.Provider value={dispatch}>
        {children}
      </ProfilesDispatchContext.Provider>
    </ProfilesStateContext.Provider>
  );
}
