import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesStateContext } from '../../context/moviesContext';

export default function MoviePlaybackView({ location: { state } }) {
  const params = useParams();

  const [videoData, setVideoData] = useState({});

  const { allMovies } = useContext(MoviesStateContext);

  useEffect(() => {
    if (state !== undefined) {
      // if user clicks from interfacce and doesn't type the url:
      return setVideoData({
        movie: state.movie,
        trailerUrl: state.trailerUrl,
      });
    }

    //  else if the user decides to write the id in the url bar instead of clicking the movie poster in the actual app.
    //  find the object properties by matching the id to the id from useParams.
    const foundMovie = allMovies.find(
      (movie) => movie.id === Number(params.id)
    );
    return setVideoData({
      movie: foundMovie,
      trailerUrl: params.trailerUrl,
    });

    // the reason why I want to check for both use-cases instead of just going with useParams only is because:
    // if the user clicks from the interface the video going to load noticeably faster, so I want to leave that as an option.
    // and I can't just go with only props because:
    // if the user types the url without clicking on the interface, it'll throw an error (the props don't exist).
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
