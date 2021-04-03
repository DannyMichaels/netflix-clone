import { useContext, useEffect, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.
import { useLocation, useParams } from 'react-router';

// utils
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import Banner from '../../../components/MovieComponents/Banner/Banner';
import MovieCard from '../../../components/MovieComponents/MovieCard/MovieCard';
import SearchResultsView from '../../../components/MovieComponents/SearchResults/SearchResultsView';
import Layout from '../../../components/shared/Layout/Layout';
import { MoviesStateContext } from '../../../context/movies/moviesContext';

// context
import { SearchContext } from '../../../context/search/searchContext';
import {
  getMoviesByGenreId,
  getMoviesByPersonId,
  getOnePersonById,
} from '../../../services/movies';

// styles
import { InnerColumn } from '../../../components/shared/styled-components/InnerColumn';

export default function BrowseByCategoryAndId() {
  const [movies, setMovies] = useState([]);
  const { allGenres } = useContext(MoviesStateContext);
  const { search, browseName, setBrowseName } = useContext(SearchContext);
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      // fetch by person or genres depending on url pathname.
      if (pathname.includes('/person')) {
        const movieDataByPersonId = await getMoviesByPersonId(id);
        const { name } = await getOnePersonById(id);
        setMovies(movieDataByPersonId);
        setBrowseName(name);
      } else {
        const movieDataByGenreId = await getMoviesByGenreId(id);
        const foundGenre = allGenres?.find((g) => g.id === Number(id));

        setMovies(movieDataByGenreId);
        setBrowseName(foundGenre?.name);
      }
    };
    fetchMovies();
    // eslint-disable-next-line
  }, [id, pathname]);

  const moviesJSX = !search ? (
    <InnerColumn browseName={browseName}>
      <ul className="search__searchList">
        {movies
          .filter(({ backdrop_path }) => Boolean(backdrop_path))
          .map((movie) => (
            <picture>
              <MovieCard
                movie={movie}
                src={`${baseImgUrl}${movie.backdrop_path}`}
                alt={movie.name}
                key={movie.id}
                className="search__searched-movie"
              />
            </picture>
          ))}
      </ul>
    </InnerColumn>
  ) : (
    <SearchResultsView />
  );

  return (
    <Layout>
      <Banner />
      {moviesJSX}
    </Layout>
  );
}
