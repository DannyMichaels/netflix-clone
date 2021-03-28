import Levenshtein from 'levenshtein';
import React, { useState, createContext } from 'react';
import { getSearchedMovies } from '../../services/movies';

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  const [search, setSearch] = useState('');
  const [queriedMovies, setQueriedMovies] = useState([]);

  const handleSearch = async ({ target: { value: userInput } }) => {
    setSearch(userInput);
    const searchedMovies = await getSearchedMovies(search);
    setQueriedMovies(searchedMovies);
  };

  const getQueriedMovies = () => {
    return queriedMovies
      .filter(({ backdrop_path }) => Boolean(backdrop_path)) // don't make a cell for a movie that has images that are undefined.
      .sort((a, b) => {
        let leva = new Levenshtein(a.title, search).distance; // the movie that is closest to the users search input will appear in top-left.
        let levb = new Levenshtein(b.title, search).distance;
        return leva - levb;
      });
  };

  return (
    <SearchContext.Provider
      value={{ search, setSearch, getQueriedMovies, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}