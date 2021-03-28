import { useContext, useEffect, useMemo, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.
import { useParams } from 'react-router';

// components
import Banner from '../../../../components/MovieComponents/Banner/Banner';
import MovieCard from '../../../../components/MovieComponents/MovieCard/MovieCard';
import SearchResultsView from '../../../../components/MovieComponents/SearchResults/SearchResultsView';
import Layout from '../../../../components/shared/Layout/Layout';

// context
import { SearchContext } from '../../../../context/search/searchContext';
import {
  getMoviesByPersonId,
  getOnePersonById,
} from '../../../../services/movies';
import { baseImgUrl } from '../../../../utils/generalUtils';
import { InnerColumn } from '../browseByCategoryAndId.styles';

function BrowseByPersonId() {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');

  const { search } = useContext(SearchContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      // fetch by person or genres dependign on url path.
      const movieDataByPersonId = await getMoviesByPersonId(id);
      const { name } = await getOnePersonById(id);
      console.log({ name });

      setMovies(movieDataByPersonId);
      setName(name);
    };
    fetchMovies();
  }, [id]);

  const moviesJSX = !search ? (
    <InnerColumn>
      <h1>{name}</h1>
      <ul className="home__searchList">
        {movies
          .filter(({ backdrop_path }) => Boolean(backdrop_path))
          .map((movie) => (
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

export default BrowseByPersonId;
