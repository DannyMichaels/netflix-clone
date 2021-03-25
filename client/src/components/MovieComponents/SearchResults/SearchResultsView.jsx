import MovieCard from '../MovieCard/MovieCard';

const baseUrl = 'https://image.tmdb.org/t/p/original';

export default function SearchResultsView({ getQueriedMovies }) {
  return (
    <>
      {!getQueriedMovies().length && <h1>no results</h1>}
      <ul className="home__searchList">
        {getQueriedMovies().map((movie) => (
          <picture>
            <MovieCard
              src={`${baseUrl}${movie.backdrop_path}`}
              alt={movie.name}
              key={movie.id}
              className="home__searched-movie"
            />
          </picture>
        ))}
      </ul>
    </>
  );
}
