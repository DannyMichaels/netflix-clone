import { Children } from 'react'; // give everything without an id it's own unique key prop without using index (which is problematic) or some id generator by using React.Children.

// components
import Banner from '../../components/MovieComponents/Banner/Banner';
import Row from '../../components/MovieComponents/Row/MovieRow';

// utils
import { movieRows } from './home.utils';

function Home() {
  const ROWS = Children.toArray(
    movieRows.map((row, index) => (
      <Row title={row.title} fetchUrl={row.fetchUrl} isLargeRow={index === 0} />
    ))
  );

  return (
    <>
      <div>
        <Banner />
      </div>
      <div>{ROWS}</div>
    </>
  );
}

export default Home;
