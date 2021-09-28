import {
  Children,
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import useResize from '../../../hooks/useResize';

// services and utils
import { getRowMovies } from '../../../services/movies';
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

const ROW_TRANSITION_MS = 750;

export default function Row({ title, fetchUrl, isLargeRow, rowIndex }) {
  const [movies, setMovies] = useState([]); // the array of the movies in the row
  const [canScrollPrev, setCanScrollPrev] = useState(false); // a boolean for if a user can click back.

  const [activeIndicatorNumber, rawSetActiveIndicatorNumber] = useState(0); // the current active indicator index
  const setActiveIndicatorNumber = (...args) => {
    //  a timeout to wait for the animation to end before changing the active indicator number.
    setTimeout(() => rawSetActiveIndicatorNumber(...args), ROW_TRANSITION_MS);
  };

  const [indicators, setIndicators] = useState([]); // array of indicators
  const [containerWidth, setContainerWidth] = useState(0); // the width for .row__posters
  const [translateXValue, setTranslateXValue] = useState(0); // state for translateX css property
  const [unclonedMoviesCount, setUnclonedMoviesCount] = useState(0); // count of original movies that aren't cloned
  const [maxScrollPosition, setMaxScrollPosition] = useState(0); // the max indicator amount
  const [visiblePosterCount, setVisiblePosterCount] = useState(0); // number of amount of movies a user can see, changes on resize
  const [skipTransition, setSkipTransition] = useState(false); // a boolean for when to have transition css set to null (to fix snappy transition on certain condition)
  const [posterWidth, setPosterWidth] = useState(0); /// width of one poster
  const [moviesUpdated, setMoviesUpdated] = useState(false); // value to be set when the dom finished painting and movies got cloned in the row
  const { currentProfile } = useContext(ProfilesStateContext);
  const [moviesLoaded, setMoviesLoaded] = useState(false); // state for if movies got loaded

  const postersRef = useRef(null); // reference for the container of all movies in the row.
  const rowRef = useRef(null); // reference for the row parent container.
  let timeoutInProgress = useRef(false); // a boolean for if timeout is im progress, used to stop user from spam clicking next or back in certain conditions
  let [isAnimating, setIsAnimating] = useState(false);

  const createIndicators = useCallback(
    (num) => {
      if (num) return setIndicators([...new Array(num).keys()]);
      if (!isNaN(maxScrollPosition) && maxScrollPosition > 0) {
        setIndicators([...new Array(maxScrollPosition).keys()]);
        return;
      }
    },
    [maxScrollPosition]
  );

  const changeMaxScrollPosition = useCallback(() => {
    let result = Math.floor(unclonedMoviesCount / visiblePosterCount);
    setMaxScrollPosition(Number(result));

    createIndicators();
  }, [visiblePosterCount, createIndicators, unclonedMoviesCount]);

  const getPosterWidth = useCallback(() => {
    let posterWideness = Math.round(
      postersRef?.current
        ?.querySelector('.row__poster')
        ?.getBoundingClientRect()?.width
    );

    setPosterWidth(posterWideness);

    return posterWideness;
  }, [postersRef]);

  const getVisiblePosterCount = useCallback(() => {
    let visiblePosterAmount = Math.round(
      rowRef?.current?.clientWidth / posterWidth
    );

    setVisiblePosterCount(visiblePosterAmount);
  }, [posterWidth]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getRowMovies(fetchUrl, currentProfile?.isKid);
      const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
        Boolean(backdrop_path)
      );

      setUnclonedMoviesCount(moviesThatHaveImage.length); // set the original uncloned movies count.
      setMovies(moviesThatHaveImage);
      setMoviesLoaded(rowIndex);
    };
    fetchData();
  }, [fetchUrl, currentProfile?.isKid, rowIndex]);

  useEffect(() => {
    // create clones of movies after dom has painted
    // check if movies loaded
    let result = movies?.length === unclonedMoviesCount;

    if (result && result !== 0) {
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

      // create pagination indicators
      let maxScrollPos = Math.floor(unclonedMoviesCount / visiblePosterAmount);
      setMaxScrollPosition(Number(maxScrollPos));
      createIndicators(maxScrollPos);

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

      setContainerWidth(newMoviesState.length * posterWideness);
      setTranslateXValue(-visiblePosterAmount * posterWideness); // set the initial translateX css
      setMovies(newMoviesState);
      setMoviesUpdated(rowIndex);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    if (skipTransition) {
      setTimeout(() => {
        setIsAnimating(false);
        setSkipTransition(false);
      }, 10);
    }
  }, [skipTransition]);

  // change these when user resizes
  useResize(() => {
    if (moviesUpdated === rowIndex) {
      const initialTranslateXValue = -posterWidth * visiblePosterCount;

      getPosterWidth();
      getVisiblePosterCount();
      setTranslateXValue((prevState) => {
        // this is so when user resizes but on different indicator number, reset to 0, reset translateX to initial.
        // maybe there's a more elegant solution to keep it where it is without losing indicator number
        if (prevState === initialTranslateXValue) return prevState;
        return initialTranslateXValue;
      });
      setActiveIndicatorNumber(0);

      // create pagination indicators
      let maxScrollPos = Math.floor(unclonedMoviesCount / visiblePosterCount);
      setMaxScrollPosition(Number(maxScrollPos));
      createIndicators(maxScrollPos);
    }
  });

  const onNavigate = (direction) => {
    if (timeoutInProgress.current) return;
    if (isAnimating === rowIndex) return;

    const initialTranslateXValue = -posterWidth * visiblePosterCount;
    const lastAllowedUnclonedPoster = unclonedMoviesCount * -posterWidth;
    // const lastAllowedPoster = lastAllowedUnclonedPoster + initialTranslateXValue;

    setCanScrollPrev(rowIndex); // makes us able to scroll left after scrolling forward for the first time (just like netflix)
    setIsAnimating(rowIndex);

    if (direction === 'forward') {
      // for going forward
      let translateXNext = translateXValue - posterWidth * visiblePosterCount; // newState = prevState - posterWidth * visiblePosterCount

      if (translateXNext < lastAllowedUnclonedPoster) {
        devLog('SKIPPING TRANSITION');
        timeoutInProgress.current = true;

        setActiveIndicatorNumber(0);

        setTimeout(() => {
          devLog('timeout called');
          setSkipTransition(true);
          setTranslateXValue(initialTranslateXValue);
          timeoutInProgress.current = false;
        }, ROW_TRANSITION_MS + 10); // the timeout that once ends will go back to initial translateX value, can be snappy and ugly if doesn't work

        setTranslateXValue(translateXNext);
      } else {
        setActiveIndicatorNumber((prev) => (prev += 1));
        setTimeout(() => setIsAnimating(false), ROW_TRANSITION_MS);

        setTranslateXValue(translateXNext);
      }
    } else {
      //  if clicking back
      let translateXBack = translateXValue + posterWidth * visiblePosterCount; // newState = prevState + posterWidth * visiblePosterCount

      if (translateXBack > initialTranslateXValue) {
        devLog('SKIPPING TRANSITION');

        timeoutInProgress.current = true;

        setActiveIndicatorNumber(indicators.length - 1);

        setTimeout(() => {
          devLog('timeout called');
          setSkipTransition(true);
          setTranslateXValue(lastAllowedUnclonedPoster);
          timeoutInProgress.current = false;
        }, ROW_TRANSITION_MS + 10);

        setTranslateXValue(translateXBack);
      } else {
        setActiveIndicatorNumber((prev) => (prev -= 1));
        setTimeout(() => setIsAnimating(false), ROW_TRANSITION_MS);

        setTranslateXValue(translateXBack);
      }
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
      containerWidth={containerWidth}
      translateXValue={translateXValue}
      skipTransition={skipTransition}
    >
      <div className="row__headerContainer">
        <h2 className="row__title">{title}</h2>

        {/* indicators */}
        <ul className="row__pagination">
          {indicators.map((_, idx) => (
            <li
              key={idx}
              className={`indicator${
                idx === activeIndicatorNumber ? ' active' : ''
              }`}
            />
          ))}
        </ul>
      </div>

      {/* back btn */}
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

      {/* movie posters */}
      <div className="row__posters" ref={postersRef}>
        {CARDS}
      </div>

      {/* next btn */}
      {moviesUpdated === rowIndex && (
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
      )}
    </StyledRow>
  );
}
