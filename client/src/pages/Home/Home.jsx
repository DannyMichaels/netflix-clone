import { Children, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import Row from '../../components/MovieComponents/Row/Row';
import SearchResultsView from '../../components/MovieComponents/SearchResults/SearchResultsView';
import Layout from '../../components/shared/Layout/Layout';

// utils, helpers and Services
import { movieRows } from './home.utils';
import { getSearchedMovies } from '../../services/movies';

export default function Home() {
  const [search, setSearch] = useState('');
  const [queriedMovies, setQueriedMovies] = useState([]);

  const handleSearch = async ({ target: { value: userInput } }) => {
    setSearch(userInput);
    const searchedMovies = await getSearchedMovies(search);
    setQueriedMovies(searchedMovies);
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
    <SearchResultsView queriedMovies={queriedMovies} search={search} />
  );

  const loadMoviesJSX = () => {
    if (!search) {
      return ROWS;
    } else {
      return RESULTS;
    }
  };

  return (
    <Layout
      handleSearch={handleSearch}
      searchedValue={search}
      setSearch={setSearch}
    >
      <Banner />
      {loadMoviesJSX()}
    </Layout>
  );
}
