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

  const handleSelectMovie = useCallback((movie) => {
    const mediaType = getType(movie);

    setSelectedMovie(movie);

    const getTrailer = async () => {
      const fetchedUrl = await getYoutubeVideo(mediaType, movie.id);
      setTrailerUrl(fetchedUrl);
    };
    getTrailer();
  }, []);

  const onPlayMovie = (movie) => {
    handleSelectMovie(movie);
    canRedirect.current = true;
  };

  useEffect(() => {
    if (trailerUrl && selectedMovie && canRedirect.current) {
      // push to MoviePlayBackView.jsx if handleSelectMovie ran.
      push({
        pathname: `/watch/${selectedMovie.id}/${trailerUrl}`,
        state: {
          movie: selectedMovie,
          trailerUrl: trailerUrl,
        },
      });
    }
  }, [trailerUrl, selectedMovie, push]);

  return {
    selectedMovie,
    setSelectedMovie,
    trailerUrl,
    setTrailerUrl,
    handleSelectMovie,
    onPlayMovie,
    canRedirect,
  };
};
