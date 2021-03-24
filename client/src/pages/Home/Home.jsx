import { Children, useState } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import Row from '../../components/MovieComponents/Row/Row';
import Layout from '../../components/shared/Layout/Layout';
import { TMDB_API } from '../../services/apiConfig';

// utils
import { movieRows as defaultRows } from './home.utils';

function Home() {
  const [currentRows, setCurrentRows] = useState(defaultRows);
  const [search, setSearch] = useState('');

  const handleSearch = async ({ target: { value: userInput } }) => {
    // TODO: once we have accounts set up, have a terenary opertaror for the users age regarding include adult being true or false
    setSearch(userInput);

    const searchUrl = `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&include_adult=false
    &query=${search}`;

    const { data } = await TMDB_API.get(searchUrl);

    const newQueriedRows = data.results.map((res) => ({
      ...res,
      fetchUrl: searchUrl,
    }));

    if (userInput) {
      setCurrentRows(newQueriedRows);
    } else {
      setCurrentRows(defaultRows);
    }
  };

  const ROWS = Children.toArray(
    currentRows.map(({ title, fetchUrl }) => (
      <Row
        title={title}
        fetchUrl={fetchUrl}
        isLargeRow={title.match(/^netflix originals$/i)}
        isSearching={search}
      />
    ))
  );

  return (
    <Layout setSearch={setSearch} handleSearch={handleSearch}>
      <Banner />
      {ROWS}
    </Layout>
  );
}

export default Home;
