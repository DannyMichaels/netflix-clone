// services and utils
import { useContext } from 'react';
import { SearchContext } from '../../../context/search/searchContext';
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import MovieCard from '../MovieCard/MovieCard';

//styles
import { InnerColumn } from './searchResults.styles';

export default function SearchResultsView() {
  const { getQueriedMovies } = useContext(SearchContext);

  return (
    <InnerColumn results={!getQueriedMovies().length}>
      {!getQueriedMovies().length && <h1>no results</h1>}
      <ul className="home__searchList">
        {getQueriedMovies().map((movie) => (
          <picture>
            <MovieCard
              movie={movie}
              src={`${baseImgUrl}${movie.backdrop_path}`}
              alt={movie.name}
              key={movie.id}
              className="home__searched-movie"
            />
          </picture>
        ))}
      </ul>
    </InnerColumn>
  );
}
