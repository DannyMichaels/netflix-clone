import React, { useState, createContext } from 'react';

const ProfilesContext = createContext();

export default function ProfilesContextProvider({ children }) {
  const [profiles, setProfiles] = useState(() => {
    const storedProfiles = localStorage.getItem('profiles');
    if (storedProfiles !== null) {
      return JSON.parse(storedProfiles);
    }
    return [];
  });

  return (
    <ProfilesContext.Provider value={[profiles, setProfiles]}>
      {children}
    </ProfilesContext.Provider>
  );
}
