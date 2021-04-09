import { cloneElement } from 'react';

import MoviesContextProvider from './movies/moviesContext';
import SearchContextProvider from './search/searchContext';
import ProfilesContextProvider from './profiles/profilesContext';

const providers = [
  <MoviesContextProvider />,
  <SearchContextProvider />,
  <ProfilesContextProvider />,
];

export const ContextProvidersNest = ({ children }) =>
  providers.reduceRight(
    (out, element) => cloneElement(element, {}, out),
    <>{children}</>
  );
