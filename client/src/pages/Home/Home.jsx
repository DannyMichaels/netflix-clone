import { Children } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import Row from '../../components/MovieComponents/Row/Row';
import Layout from '../../components/shared/Layout/Layout';

// utils
import { movieRows } from './home.utils';

function Home() {
  const ROWS = Children.toArray(
    movieRows.map(({ title, fetchUrl }) => (
      <Row
        title={title}
        fetchUrl={fetchUrl}
        isLargeRow={title.match(/^netflix originals$/i)}
      />
    ))
  );

  return (
    <Layout>
      <Banner />
      {ROWS}
    </Layout>
  );
}

export default Home;
