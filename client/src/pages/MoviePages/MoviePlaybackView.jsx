import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllMovies } from '../../services/movies';
import { movieRows } from '../Home/home.utils';

function MoviePlaybackView({ location: { state } }) {
  const { id, trailerUrl } = useParams();

  let fetchUrls = [];
  movieRows.forEach(({ fetchUrl }) => {
    fetchUrls.push(fetchUrl);
  });

  useEffect(() => {
    fetchUrls.map(
      async (url) =>
        await getAllMovies(url).then((data) => console.log({ data }))
    );
  });

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* <YouTube videoId={trailerUrl} opts={VIDEO_OPTIONS} /> */}
      <iframe
        frameBorder="0"
        allowFullScreen="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Youtube Video"
        width="100vw"
        height="100vh"
        src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&amp;enablejsapi=1&amp;widgetid=5&showinfo=0`}
        id={id}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default MoviePlaybackView;
