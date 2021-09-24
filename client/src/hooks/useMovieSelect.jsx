import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { getYoutubeVideo } from '../services/movies';

const getType = (movie) => {
  if (movie?.media_type) {
    return movie.media_type;
  } else if (movie?.first_air_date) {
    return 'tv';
  } else {
    return 'movie';
  }
};

export const useMovieSelect = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');

  const canRedirect = useRef(false);

  const { push } = useHistory();

  useEffect(() => {
    if (trailerUrl && selectedMovie && canRedirect.current) {
      // push to MoviePlayBackView.jsx if playMovie ran.
      push({
        pathname: `/watch/${selectedMovie.id}/${trailerUrl}`,
        state: {
          movie: selectedMovie,
          trailerUrl: trailerUrl,
        },
      });
    }
  }, [trailerUrl, selectedMovie, push]);

  const onSelectMovie = useCallback(async (movie) => {
    const mediaType = await getType(movie);
    setSelectedMovie(movie);
    const fetchedUrl = await getYoutubeVideo(mediaType, movie?.id);
    setTrailerUrl(fetchedUrl);
  }, []);

  const playMovie = async (movie) => {
    onSelectMovie(movie);
    canRedirect.current = true;
  };

  return {
    selectedMovie,
    setSelectedMovie,
    trailerUrl,
    setTrailerUrl,
    onSelectMovie,
    playMovie,
    canRedirect,
  };
};
