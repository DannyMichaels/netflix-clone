import Row from '../components/Row';
import { MOVIE_REQUESTS as REQUESTS } from '../utils/movieUrls';

function Home() {
  return (
    <div>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={REQUESTS.FETCH_NETFLIX_ORIGINALS}
      />
      <Row title="Trending Now" fetchUrl={REQUESTS.FETCH_TRENDING} />
    </div>
  );
}

export default Home;
