import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesStateContext } from '../../context/moviesContext';

export default function MoviePlaybackView({ location: { state } }) {
  const params = useParams();

  const [videoData, setVideoData] = useState({});

  const { allMovies } = useContext(MoviesStateContext);

  useEffect(() => {
    if (state !== undefined) {
      return setVideoData({
        movie: state.movie,
        trailerUrl: state.trailerUrl,
      });
    }

    const foundMovie = allMovies.find(
      (movie) => movie.id === Number(params.id)
    );

    return setVideoData({
      movie: foundMovie,
      trailerUrl: params.trailerUrl,
    });
  }, [allMovies, params, state]);

  const { movie, trailerUrl } = videoData;

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <iframe
        frameBorder="0"
        allowFullScreen="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Youtube Video"
        width="100vw"
        height="100vh"
        src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&amp;enablejsapi=1&amp;widgetid=5&showinfo=0`}
        id={movie?.id}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
