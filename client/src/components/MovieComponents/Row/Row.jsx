import {
  Children,
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
} from 'react';
import useResize from '../../../hooks/useResize';

// services and utils
import { getRowMovies } from '../../../services/movies';
import { baseImgUrl } from '../../../utils/generalUtils';
import devLog from './../../../utils/devLog'; // developer environment console logs

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './Row.styles';

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';
import useBoundingBox from '../../../hooks/useBoundingBox';

const FALLBACK_POSTER_IMG =
  'https://image.tmdb.org/t/p/original/fl6S0hvaYvFeRYGniMm9KzNg3AN.jpg';

const ROW_TRANSITION_MS = 750;

export default function Row({ title, fetchUrl, isLargeRow, rowIndex }) {
  const { currentProfile } = useContext(ProfilesStateContext); // current user profile

  const [movies, setMovies] = useState([]); // the array of the movies in the row
  const [moviesLoaded, setMoviesLoaded] = useState(false); // state for if movies got loaded
  const [moviesUpdated, setMoviesUpdated] = useState(false); // value to be set when the dom finished painting and movies got cloned in the row
  const [unclonedMoviesCount, setUnclonedMoviesCount] = useState(0); // count of original movies that aren't cloned

  const [activeIndicatorNumber, rawSetActiveIndicatorNumber] = useState(0); // the current active indicator index
  const setActiveIndicatorNumber = (...args) => {
    //  a timeout to wait for the animation to end before changing the active indicator number.
    setTimeout(() => rawSetActiveIndicatorNumber(...args), ROW_TRANSITION_MS);
  };
  const [indicators, setIndicators] = useState([]); // array of indicators
  const [maxScrollPosition, setMaxScrollPosition] = useState(0); // the max indicator amount
  const [canScrollPrev, setCanScrollPrev] = useState(false); // a boolean for if a user can click back.

  const [containerWidth, setContainerWidth] = useState(0); // the width for .row__posters
  const [translateXValue, setTranslateXValue] = useState(0); // state for translateX css property
  const [visiblePosterCount, setVisiblePosterCount] = useState(0); // number of amount of movies a user can see, changes on resize
  const [skipTransition, setSkipTransition] = useState(false); // a boolean for when to have transition css set to null (to fix snappy transition on certain condition)
  const [isAnimating, setIsAnimating] = useState(false); // state for when the row transition css is in action, used to stop user from spam clicking next.

  const [rowRef, rowDimensions] = useBoundingBox(); // reference for the row parent container.

  const nextButtonRef = useRef(null); // reference for the next button.
  let timeoutInProgress = useRef(false); // a boolean for if timeout is im progress, used to stop user from spam clicking next or back in certain conditions

  const [postersRef, posterDimensions] = useBoundingBox('.row__poster');

  const posterWidth = useMemo(() => posterDimensions?.width ?? 0, [
    posterDimensions?.width,
  ]);

  const createPaginationIndicators = useCallback(
    (num) => {
      if (num) return setIndicators([...new Array(num).keys()]);
      if (!isNaN(maxScrollPosition) && maxScrollPosition > 0) {
        setIndicators([...new Array(maxScrollPosition).keys()]);
        return;
      }
    },
    [maxScrollPosition]
  );

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

  useLayoutEffect(() => {
    // create clones of movies after dom has painted
    // check if movies loaded
    let result = movies?.length === unclonedMoviesCount;

    if (result && result !== 0) {
      const previousMoviesState = [...movies];
      const newMoviesState = [...movies];

      const posterWideness = posterWidth;

      let sliderButtonWidth = nextButtonRef?.current?.clientWidth;

      // get visible poster amount
      let visiblePosterAmount = Math.round(
        (rowRef?.current?.clientWidth - 2 * sliderButtonWidth) / posterWideness
      );

      setVisiblePosterCount(visiblePosterAmount);

      // create pagination indicators
      let maxScrollPos = Math.floor(unclonedMoviesCount / visiblePosterAmount);
      setMaxScrollPosition(Number(maxScrollPos));
      createPaginationIndicators(maxScrollPos);

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

  useEffect(() => {
    const initialTranslateXValue = -posterWidth * visiblePosterCount;

    console.log('setting tx value on resize');
    setTranslateXValue((prevState) => {
      // this is so when user resizes but on different indicator number, reset to 0, reset translateX to initial.
      // maybe there's a more elegant solution to keep it where it is without losing indicator number
      if (prevState === initialTranslateXValue) return prevState;
      return initialTranslateXValue;
    });
    setActiveIndicatorNumber(0);
  }, [posterWidth, visiblePosterCount]);

  useEffect(() => {
    const sliderButtonWidth = nextButtonRef?.current?.clientWidth ?? 0;

    let visiblePosterAmount = Math.round(
      (rowDimensions?.width - 2 * sliderButtonWidth) / posterWidth
    );

    setVisiblePosterCount(visiblePosterAmount);
  }, [posterWidth, rowDimensions?.width]);

  useEffect(() => {
    console.log('setting indicators on resize');
    let maxScrollPos = Math.floor(unclonedMoviesCount / visiblePosterCount);
    setMaxScrollPosition(Number(maxScrollPos));
    createPaginationIndicators(maxScrollPos);
  }, [posterWidth, unclonedMoviesCount, visiblePosterCount]);

  const onNavigate = (direction) => {
    if (timeoutInProgress.current) return;
    if (isAnimating === rowIndex) return;

    const initialTranslateXValue = -posterWidth * visiblePosterCount;
    const lastAllowedUnclonedPoster = unclonedMoviesCount * -posterWidth;
    // const lastAllowedPoster = lastAllowedUnclonedPoster + initialTranslateXValue;

    setCanScrollPrev(rowIndex); // makes us able to scroll left after scrolling forward for the first time (just like netflix)
    setIsAnimating(rowIndex); // stops user from spam clicking next or prev button

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
        }, ROW_TRANSITION_MS); // the timeout that once ends will go back to initial translateX value, can be snappy and ugly if doesn't work

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
        }, ROW_TRANSITION_MS);

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
          ref={nextButtonRef}
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
