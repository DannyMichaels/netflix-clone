import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesStateContext } from '../../context/moviesContext';

export default function MoviePlaybackView({ location: { state } }) {
  const params = useParams();

  const [videoData, setVideoData] = useState({});

  const { allMovies } = useContext(MoviesStateContext);

  useEffect(() => {
    const getMovie = async () => {
      if (state !== undefined) {
        return setVideoData({
          movie: state.movie,
          trailerUrl: state.trailerUrl,
        });
      }

      const foundMovie = allMovies.find(
        (movie) => movie.id === Number(params.id)
      );

      if (foundMovie) {
        return setVideoData({
          movie: foundMovie,
          trailerUrl: params.trailerUrl,
        });
      }
    };
    getMovie();
  }, [allMovies, params, state]);

  const { movie, trailerUrl } = videoData;

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <iframe
        aria-label={`Video player playing ${movie?.name ?? 'a video'}`}
        frameBorder="0"
        allowFullScreen="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={movie?.name ?? 'Video'}
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
