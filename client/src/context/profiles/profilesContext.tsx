import React, { createContext, useReducer, useRef, useEffect } from 'react';

// utils
import { getRandomId } from '@/utils/generateId';

// reducer
import { profilesReducer } from '@/reducers/ProfilesReducer/profilesReducer';
import { FETCH_PROFILES } from '@/reducers/ProfilesReducer/profilesReducerTypes';
import { IMAGES } from '@/utils/generalUtils';
import { merge } from 'lodash';
import { Profile, ProfilesState } from '../../types/profile';

const initialProfilesState: ProfilesState = {
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
  maxProfileLength: 5,
  currentProfile: null,
  profilesAreLoading: true,
};

export const ProfilesStateContext =
  createContext<ProfilesState>(initialProfilesState);

// @ts-ignore
export const ProfilesDispatchContext = createContext();

export default function ProfilesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(profilesReducer, initialProfilesState);

  const defaultState = useRef(initialProfilesState);

  useEffect(() => {
    const loadState = async () => {
      const profiles = localStorage.getItem('profiles');

      if (profiles && JSON.parse(profiles) !== null) {
        try {
          merge(state, JSON.parse(profiles));
        } catch (e) {
          console.error('ERROR:', e);
        }

        return state;
      } else {
        localStorage.setItem(
          'profiles',
          JSON.stringify(defaultState.current.profiles)
        );

        // @ts-ignore
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
    <ProfilesStateContext.Provider value={state as ProfilesState}>
      <ProfilesDispatchContext.Provider value={dispatch}>
        {children}
      </ProfilesDispatchContext.Provider>
    </ProfilesStateContext.Provider>
  );
}
