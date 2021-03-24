import { Children, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import MovieCard from '../../components/MovieComponents/MovieCard/MovieCard';
import Row from '../../components/MovieComponents/Row/Row';
import Layout from '../../components/shared/Layout/Layout';
import { TMDB_API } from '../../services/apiConfig';
import { InnerColumn } from './home.styles';

// utils
import { movieRows } from './home.utils';

const baseUrl = 'https://image.tmdb.org/t/p/original';

function Home() {
  const [search, setSearch] = useState('');
  const [queriedMovies, setQueriedMovies] = useState([]);

  const handleSearch = async ({ target: { value: userInput } }) => {
    // TODO: once we have accounts set up, have a terenary opertaror for the users age regarding include adult being true or false
    setSearch(userInput);

    const searchUrl = `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false
    &query=${search}`;

    const { data } = await TMDB_API.get(searchUrl);

    setQueriedMovies(data.results);
  };

  const getQueriedMovies = () =>
    queriedMovies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );

  const ROWS = Children.toArray(
    movieRows.map(({ title, fetchUrl }) => (
      <Row
        handleSearch={handleSearch}
        title={title}
        fetchUrl={fetchUrl}
        isLargeRow={title.match(/^netflix originals$/i)}
        isSearching={search}
      />
    ))
  );

  const RESULTS = (
    <InnerColumn results={!getQueriedMovies().length}>
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
    </InnerColumn>
  );

  const moviesJSX = !search ? ROWS : RESULTS;

  return (
    <Layout handleSearch={handleSearch} isSearching={search}>
      <Banner />
      {moviesJSX}
    </Layout>
  );
}

export default Home;
