import Levenshtein from 'levenshtein';
import React, { useState, createContext, useContext } from 'react';
import { getSearchedMovies } from '@/services/movies';
import { ProfilesStateContext } from '../profiles/profilesContext';
import { debounce } from '@/utils/debounce';
import { Movie } from '../../types/movie';

export const SearchContext = createContext(null);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState('');
  const [queriedMovies, setQueriedMovies] = useState([]);
  const [browseName, setBrowseName] = useState('');

  const { currentProfile } = useContext(ProfilesStateContext);

  const onSearch = (e) => {
    setSearch(e.target.value);
    handleSearch(e);
  };

  const handleSearch = debounce(async () => {
    const searchedMovies = await getSearchedMovies(
      search,
      currentProfile.isKid
    );

    const newQueriedMovies = searchedMovies
      .filter(({ backdrop_path }: Movie) => Boolean(backdrop_path)) // don't make a cell for a movie that has images that are undefined.
      .sort((a: Movie, b: Movie) => {
        let leva = new Levenshtein(a.title, search).distance; // the movie that is closest to the users search input will appear in top-left.
        let levb = new Levenshtein(b.title, search).distance;
        return leva - levb;
      });

    setQueriedMovies(newQueriedMovies);
  }, 1000);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        queriedMovies,
        onSearch,
        browseName,
        setBrowseName,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
