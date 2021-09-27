import {
  Children,
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
} from 'react';
import useResize from '../../../hooks/useResize';

// services and utils
import { getAllMovies } from '../../../services/movies';
import { baseImgUrl } from '../../../utils/generalUtils';
import devLog from './../../../utils/devLog'; // developer environment console logs

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './row.styles';

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';

const FALLBACK_POSTER_IMG =
  'https://image.tmdb.org/t/p/original/fl6S0hvaYvFeRYGniMm9KzNg3AN.jpg';

export default function Row({ title, fetchUrl, isLargeRow, rowIndex }) {
  const [movies, setMovies] = useState([]); // the array of the movies in the row
  const [canScrollPrev, setCanScrollPrev] = useState(false); // a boolean for if a user can click back.
  const [activeIndex, setActiveIndex] = useState(0); // the current active indicator index
  const [indicators, setIndicators] = useState([]); // array of indicators
  const [moviesLength, setMoviesLength] = useState(0); // the count of original movies
  const [translateXValue, setTranslateXValue] = useState(0); // state for translateX css property
  const [unclonedMoviesCount, setUnclonedMoviesCount] = useState(0); // count of original movies that aren't cloned
  const [maxScrollPosition, setMaxScrollPosition] = useState(0); // the max indicator amount
  const [visiblePosterCount, setVisiblePosterCount] = useState(0); // number of amount of movies a user can see, changes on resize
  const [skipTransition, setSkipTransition] = useState(false); // a boolean for when to have transition css set to null (to fix snappy transition on certain condition)
  const [posterWidth, setPosterWidth] = useState(0); /// width of one poster
  const [moviesUpdated, setMoviesUpdated] = useState(false); // boolean to be set when the dom finished painting and movies got cloned
  const { currentProfile } = useContext(ProfilesStateContext);
  const [moviesLoaded, setMoviesLoaded] = useState(false); // state for if movies got loaded

  const postersRef = useRef(null); // reference for the container of all movies in the row.
  const rowRef = useRef(null); // reference for the row parent container.
  let timeoutInProgress = useRef(false); // a boolean for if timeout is im progress, used to stop user from spam clicking next or back in certain conditions

  const createIndicators = useCallback(() => {
    if (!isNaN(maxScrollPosition) && maxScrollPosition > 0) {
      setIndicators([...new Array(maxScrollPosition).keys()]);
    }
  }, [maxScrollPosition]);

  const changeMaxScrollPosition = useCallback(() => {
    let result = Math.floor(unclonedMoviesCount / visiblePosterCount);
    setMaxScrollPosition(Number(result));

    createIndicators();
  }, [visiblePosterCount, createIndicators, unclonedMoviesCount]);

  const getPosterWidth = useCallback(async () => {
    let posterWideness = Math.round(
      postersRef?.current
        ?.querySelector('.row__poster')
        ?.getBoundingClientRect()?.width
    );

    setPosterWidth(posterWideness);
  }, [postersRef]);

  const getVisiblePosterCount = useCallback(() => {
    let visiblePosterAmount = Math.round(
      rowRef?.current?.clientWidth / posterWidth
    );

    setVisiblePosterCount(visiblePosterAmount);
  }, [posterWidth]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getAllMovies(fetchUrl, currentProfile?.isKid);
      const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
        Boolean(backdrop_path)
      );

      setUnclonedMoviesCount(moviesThatHaveImage.length); // set the original uncloned movies count.
      setMovies(moviesThatHaveImage);
      setMoviesLoaded(rowIndex);
    };
    fetchData();
  }, [fetchUrl, currentProfile?.isKid, rowIndex]);

  useLayoutEffect(() => {
    // create clones of movies after dom has painted
    // check if movies loaded
    if (moviesLoaded === rowIndex) {
      const previousMoviesState = [...movies];
      const newMoviesState = [...movies];

      // get poster width
      let posterWideness = Math.round(
        postersRef?.current
          ?.querySelector('.row__poster')
          ?.getBoundingClientRect()?.width
      );

      setPosterWidth(posterWideness);

      // get visible poster amount
      let visiblePosterAmount = Math.round(
        rowRef?.current?.clientWidth / posterWideness
      );

      setVisiblePosterCount(visiblePosterAmount);

      //  add new cloned movies to end of array
      for (let i = 0; i < visiblePosterAmount; i++) {
        newMoviesState.push(previousMoviesState[i]);
      }

      // add new cloned movies to beginning of array
      for (
        let i = previousMoviesState.length - 1;
        i > previousMoviesState.length - 1 - visiblePosterAmount;
        i--
      ) {
        newMoviesState.unshift(previousMoviesState[i]);
      }

      setMoviesLength(newMoviesState.length * posterWideness);
      setTranslateXValue(-visiblePosterAmount * posterWideness); // set the initial translateX css
      setMovies(newMoviesState);
      setMoviesUpdated(true);
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [moviesLoaded]);

  useEffect(() => {
    if (skipTransition) {
      setTimeout(() => {
        // this.animating = false;

        setSkipTransition(false);
      }, 10);
    }
  });

  useEffect(() => {
    if (moviesUpdated) {
      // getPosterWidth();

      setTimeout(() => {
        changeMaxScrollPosition();
      }, 300);
    }
  }, [moviesUpdated, changeMaxScrollPosition]);

  // change these when user resizes
  useResize(() => {
    if (moviesUpdated) {
      getPosterWidth();
      getVisiblePosterCount();
      setTranslateXValue(-visiblePosterCount * posterWidth);
      setActiveIndex(0);
      changeMaxScrollPosition();
    }
  });

  const onNavigate = (direction) => {
    if (timeoutInProgress.current) return;

    const initial = -posterWidth * visiblePosterCount;
    const lastAllowedUnclonedPoster = unclonedMoviesCount * -posterWidth;
    // const lastAllowedPoster = lastAllowedUnclonedPoster + initial;

    setCanScrollPrev(rowIndex); // makes us able to scroll left after scrolling forward for the first time (just like netflix)

    if (direction === 'forward') {
      // for going forward
      setTranslateXValue((prevState) => {
        let translateX = prevState - posterWidth * visiblePosterCount;
        if (translateX < lastAllowedUnclonedPoster) {
          devLog('SKIPPING TRANSITION');

          timeoutInProgress.current = true;

          setTimeout(() => {
            devLog('timeout called');
            setSkipTransition(true);
            setTranslateXValue(initial);
            timeoutInProgress.current = false;
          }, 750);

          setActiveIndex(0);

          return translateX;
        } else {
          setActiveIndex((prev) => (prev += 1));

          return translateX;
        }
      });
    } else {
      //  for going back
      setTranslateXValue((prevState) => {
        let translateX = prevState + posterWidth * visiblePosterCount;

        if (translateX > initial) {
          timeoutInProgress.current = true;

          setTimeout(() => {
            devLog('timeout called');
            setSkipTransition(true);
            setTranslateXValue(lastAllowedUnclonedPoster);
            timeoutInProgress.current = false;
          }, 750);

          setActiveIndex(indicators.length - 1);
          return translateX;
        } else {
          setActiveIndex((prev) => (prev -= 1));
          return translateX;
        }
      });
    }
  };

  const CARDS =
    movies.length > 0 ? (
      Children.toArray(
        movies?.map(
          (movie, idx) =>
            movie && (
              <MovieCard
                index={idx}
                movie={movie}
                src={`${baseImgUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                isLargeRow={isLargeRow}
                alt={movie.name}
                className={`row__poster ${isLargeRow && 'row__posterLarge'} ${
                  idx < visiblePosterCount ||
                  (idx > movies.length - visiblePosterCount - 1 &&
                    idx < movies.length)
                    ? 'cloned'
                    : ''
                }`}
              />
            )
        )
      )
    ) : (
      <MovieCard
        index={0}
        movie={{
          name: 'test',
          id: 0,
          genre_ids: [10749, 16, 18],
        }}
        src={FALLBACK_POSTER_IMG}
        isLargeRow={isLargeRow}
        alt={'test'}
        key={'test' + 0}
        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
      />
    );

  return (
    <StyledRow
      aria-label="movies row"
      isLargeRow={isLargeRow}
      ref={rowRef}
      moviesLength={moviesLength}
      translateXValue={translateXValue}
      skipTransition={skipTransition}
    >
      <div className="row__headerContainer">
        <h2 className="row__title">{title}</h2>

        <ul className="row__pagination">
          {indicators.map((_, idx) => (
            <li
              key={idx}
              className={`indicator${idx === activeIndex ? ' active' : ''}`}
            />
          ))}
        </ul>
      </div>
      {canScrollPrev === rowIndex && (
        <button
          style={{ cursor: timeoutInProgress.current ? 'inherit' : 'pointer' }}
          disabled={timeoutInProgress.current}
          className="slider__nav prev"
          onClick={() => onNavigate('backward')}
        >
          <span className="icon">
            <ArrowBackIcon fontSize="large" />
          </span>
        </button>
      )}
      <div className="row__posters" ref={postersRef}>
        {CARDS}
      </div>
      <button
        style={{ cursor: timeoutInProgress.current ? 'inherit' : 'pointer' }}
        disabled={timeoutInProgress.current}
        className="slider__nav next"
        onClick={() => onNavigate('forward')}
      >
        <span className="icon">
          <ArrowForwardIcon fontSize="large" />
        </span>
      </button>
    </StyledRow>
  );
}
