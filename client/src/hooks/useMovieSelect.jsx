import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import MovieInfoModal from '../components/MovieComponents/MovieModals/MovieInfoModal';
import { getMoviesByGenreId, getYoutubeVideo } from '../services/movies';

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
  const [modalJSX, setModalJSX] = useState(<></>);
  // const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const canRedirect = useRef(false);

  const { push } = useHistory();

  useEffect(() => {
    if (trailerUrl && selectedMovie && canRedirect.current) {
      // push to MoviePlayBackView.jsx if onPlayMovie ran.
      push({
        pathname: `/watch/${selectedMovie.id}/${trailerUrl}`,
        state: {
          movie: selectedMovie,
          trailerUrl: trailerUrl,
        },
      });
    }
  }, [trailerUrl, selectedMovie, push]);

  // useEffect(() => {
  //   const getRecommendations = async () => {
  //     if (!selectedMovie) return;
  //     const recommendedData = await getMoviesByGenreId(
  //       selectedMovie.genre_ids[0]
  //     );
  //     setRecommendedMovies(recommendedData);
  //   };
  //   getRecommendations();
  // }, [selectedMovie]);

  const onSelectMovie = useCallback(async (movie) => {
    const mediaType = await getType(movie);
    setSelectedMovie(movie);
    const fetchedUrl = await getYoutubeVideo(mediaType, movie?.id);
    setTrailerUrl(fetchedUrl);
  }, []);

  const onPlayMovie = async (movie) => {
    onSelectMovie(movie);
    canRedirect.current = true;
  };

  const onOpenModal = useCallback(
    async (movie) => {
      if (!movie) return;

      onSelectMovie(movie);

      setIsInfoOpen(movie.id);

      setModalJSX(
        (curr) =>
          (curr = (
            <MovieInfoModal
              open={movie}
              setOpen={setIsInfoOpen}
              movie={movie}
            />
          ))
      );
    },
    [onSelectMovie, setIsInfoOpen]
  );

  return {
    selectedMovie,
    setSelectedMovie,
    trailerUrl,
    setTrailerUrl,
    onSelectMovie,
    onPlayMovie,
    canRedirect,
    isInfoOpen,
    // setIsInfoOpen,
    onOpenModal,
    modalJSX,
  };
};
