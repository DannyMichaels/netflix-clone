import Row from '../../components/Row/Row';
import { movieRows } from './home.utils';

function Home() {
  const ROWS = movieRows.map(({ title, fetchUrl }) => (
    <Row title={title} fetchUrl={fetchUrl} />
  ));

  return <div>{ROWS}</div>;
}

export default Home;
