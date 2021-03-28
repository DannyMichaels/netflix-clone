// services and utils
import Levenshtein from 'levenshtein';
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import MovieCard from '../MovieCard/MovieCard';

//styles
import { InnerColumn } from './searchResults.styles';

export default function SearchResultsView({ queriedMovies, search }) {
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
