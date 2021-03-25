import { Children, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import Row from '../../components/MovieComponents/Row/Row';
import SearchResultsView from '../../components/MovieComponents/SearchResults/SearchResultsView';
import Layout from '../../components/shared/Layout/Layout';

// utils, helpers and Services
import { movieRows } from './home.utils';
import { TMDB_API } from '../../services/apiConfig';
import { Redirect } from 'react-router';

function Home() {
  const [search, setSearch] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [queriedMovies, setQueriedMovies] = useState([]);

  const handleSearch = async ({ target: { value: userInput } }) => {
    // TODO: once we have accounts set up, have a terenary opertaror for the users age regarding include adult being true or false
    setSearch(userInput);

    const searchUrl = `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false
    &query=${search}`;

    const { data } = await TMDB_API.get(searchUrl);

    setQueriedMovies(data.results);
  };

  const ROWS = Children.toArray(
    movieRows.map(({ title, fetchUrl }) => (
      <Row
        handleSearch={handleSearch}
        title={title}
        fetchUrl={fetchUrl}
        isLargeRow={title.match(/^netflix originals$/i)}
        isSearching={search}
        handleVideoProps={{
          trailerUrl,
          setTrailerUrl,
          setSelectedMovie,
          mediaType,
          setMediaType,
        }}
      />
    ))
  );

  const RESULTS = (
    <SearchResultsView
      handleVideoProps={{
        trailerUrl,
        setTrailerUrl,
        setSelectedMovie,
        mediaType,
        setMediaType,
      }}
      queriedMovies={queriedMovies}
      search={search}
    />
  );

  const moviesJSX = !search ? ROWS : RESULTS;

  if (selectedMovie) {
    return (
      <Redirect
        to={{
          pathname: `/watch/${selectedMovie.id}`,
          state: {
            movie: selectedMovie,
          },
        }}
      />
    );
  }

  return (
    <Layout
      handleSearch={handleSearch}
      searchedValue={search}
      setSearch={setSearch}
    >
      <Banner />
      {moviesJSX}
    </Layout>
  );
}

export default Home;
