import { Children } from 'react';
import Row from '../../components/Row/Row';
import { movieRows } from './home.utils';

function Home() {
  // give everything it's own unique key prop without using index or some id generator by using React.Children.
  const ROWS = Children.toArray(
    movieRows.map(({ title, fetchUrl }) => (
      <Row title={title} fetchUrl={fetchUrl} />
    ))
  );

  return <div>{ROWS}</div>;
}

export default Home;
