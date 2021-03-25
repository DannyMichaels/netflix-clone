import { Children, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import MovieCard from '../../components/MovieComponents/MovieCard/MovieCard';
import Row from '../../components/MovieComponents/Row/Row';
import Layout from '../../components/shared/Layout/Layout';

// utils, helpers and Services
import { movieRows } from './home.utils';
import { TMDB_API } from '../../services/apiConfig';
import Levenshtein from 'levenshtein';

//  styles
import { InnerColumn } from './home.styles';
import SearchResultsView from '../../components/MovieComponents/SearchResults/SearchResultsView';

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

  const getQueriedMovies = () => {
    // https://stackoverflow.com/questions/26796276/array-sort-on-the-basis-of-search-text-matching-using-pure-javascript
    // https://github.com/gf3/Levenshtein
    // https://en.wikipedia.org/wiki/Levenshtein_distance
    return queriedMovies.sort((a, b) => {
      var leva = new Levenshtein(a.title, search).distance; // the movie that is closest to user's search input will appear in top-left.
      var levb = new Levenshtein(b.title, search).distance;
      return leva - levb;
    });
  };

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
      <SearchResultsView getQueriedMovies={getQueriedMovies} />
    </InnerColumn>
  );

  const moviesJSX = !search ? ROWS : RESULTS;

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
