import { Children, useContext, useEffect, useRef } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../../components/MovieComponents/Banner/Banner';
import Row from '../../../components/MovieComponents/Row/Row';
import SearchResultsView from '../../../components/MovieComponents/SearchResults/SearchResultsView';
import Layout from '../../../components/shared/Layout/Layout';

// utils, helpers and Services
import { movieRows } from '../../../utils/movieRequests';

// context
import { SearchContext } from '../../../context/search/searchContext';

export default function Home() {
  const { search, setBrowseName } = useContext(SearchContext);

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      setBrowseName('');
    }
    return () => {
      isMounted.current = false;
    };
  }, [setBrowseName]);

  const ROWS = Children.toArray(
    movieRows.map(({ title, fetchUrl }, idx) => (
      <Row
        rowIndex={idx}
        title={title}
        fetchUrl={fetchUrl}
        isLargeRow={title.match(/^netflix originals$/i)}
        isSearching={search}
      />
    ))
  );

  const RESULTS = <SearchResultsView />;

  const moviesJSX = !search ? ROWS : RESULTS;

  return (
    <Layout>
      <Banner />
      {moviesJSX}
    </Layout>
  );
}
