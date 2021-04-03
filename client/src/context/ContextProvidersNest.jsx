import { cloneElement } from 'react';

import MoviesContextProvider from './movies/moviesContext';
import SearchContextProvider from './search/searchContext';
import ProfilesContextProvider from './profiles/profilesContext';
import CurrentProfileProvider from './profiles/CurrentProfileContext';

const providers = [
  <MoviesContextProvider />,
  <SearchContextProvider />,
  <ProfilesContextProvider />,
  <CurrentProfileProvider />,
];

export const ContextProvidersNest = ({ children }) =>
  providers.reduceRight(
    (out, element) => cloneElement(element, {}, out),
    <>{children}</>
  );
