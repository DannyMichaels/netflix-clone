import { useContext, useEffect, useState } from 'react';
import { MoviesStateContext } from '../../context/moviesContext';

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// utils
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from '../../utils/navigation';

// styles
import { StyledVideo } from './moviePlaybackView.styles';

export default function MoviePlaybackView({ location: { state } }) {
  const [videoData, setVideoData] = useState({});
  const [isArrowHovered, setIsArrowHovered] = useState(false);

  const params = useParams();
  const { push } = useHistory();

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

  const toggleArrowHovered = () => {
    setIsArrowHovered(!isArrowHovered);
  };

  return (
    <StyledVideo isArrowHovered={isArrowHovered}>
      <div className={`video__arrowContainer ${isArrowHovered && 'active'}`}>
        <ArrowBackIcon
          className="video__arrowIcon"
          onMouseEnter={toggleArrowHovered}
          onMouseLeave={toggleArrowHovered}
          onClick={() => push(ROUTES.HOME)}
        />
        &nbsp;
        <p className="video__backText">Back to Browse</p>
      </div>
      <iframe
        aria-label={`Video player playing ${movie?.name ?? 'a video'}`}
        frameBorder="0"
        className="iframe"
        allowFullScreen={false}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={movie?.name ?? 'Video'}
        src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&amp;enablejsapi=1&amp;widgetid=5&showinfo=0`}
        id={movie?.id}
      />
    </StyledVideo>
  );
}
