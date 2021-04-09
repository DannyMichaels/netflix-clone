import React, { useState, createContext, useContext, useEffect } from 'react';
import { ProfilesStateContext } from './profilesContext';

export const CurrentProfileContext = createContext();

export default function CurrentProfileProvider({ children }) {
  const { profiles } = useContext(ProfilesStateContext);

  const [currentProfile, setCurrentProfile] = useState(() => {
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (selectedProfile !== null) {
      return JSON.parse(selectedProfile);
    }
    const defaultProfile = profiles.find((_, idx) => idx === 0);
    localStorage.setItem('selectedProfile', JSON.stringify(defaultProfile));
    return defaultProfile;
  });

  return (
    <CurrentProfileContext.Provider value={[currentProfile, setCurrentProfile]}>
      {children}
    </CurrentProfileContext.Provider>
  );
}
