import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import useResize from '../../../hooks/useResize';

// services and utils
import { getAllMovies } from '../../../services/movies';
import { baseImgUrl } from '../../../utils/generalUtils';

// components
import MovieCard from '../MovieCard/MovieCard';

// styles
import { StyledRow } from './row.styles';

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { ProfilesStateContext } from '../../../context/profiles/profilesContext';

export default function Row({ title, fetchUrl, isLargeRow, rowIndex }) {
  const [movies, setMovies] = useState([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicators, setIndicators] = useState([]);
  const { currentProfile } = useContext(ProfilesStateContext);

  const [maxScrollPosition, setMaxScrollPosition] = useState(
    Math.round(document.body.clientWidth / 200)
  );

  const rowRef = useRef(null);

  const changeMaxScrollPosition = useCallback(() => {
    let allPosters = rowRef.current.querySelectorAll('.movie__card--parent');
    setMaxScrollPosition(
      Math.round(allPosters.length / (document.body.clientWidth / 200) + 1)
    );
  }, []);

  const createIndicators = useCallback(() => {
    if (maxScrollPosition) {
      setIndicators([...new Array(maxScrollPosition).keys()]);
    }
  }, [maxScrollPosition]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getAllMovies(fetchUrl, currentProfile?.isKid);
      const moviesThatHaveImage = movieData.filter(({ backdrop_path }) =>
        Boolean(backdrop_path)
      );
      setMovies(moviesThatHaveImage);
    };
    fetchData();
    changeMaxScrollPosition();
    createIndicators();
  }, [fetchUrl, changeMaxScrollPosition, createIndicators, currentProfile]);

  useResize(changeMaxScrollPosition);

  const onNavigate = (direction) => {
    const elementToScroll = rowRef.current.querySelector('.row__posters');
    const allPosters = rowRef.current.querySelectorAll('.movie__card--parent');
    let currentScrollPosition = elementToScroll.scrollLeft;
    let availableWidth = document.body.clientWidth;
    let posterWidth = allPosters[0].clientWidth;
    let visibleRange = currentScrollPosition + availableWidth;

    let lastVisiblePoster;
    let index = 0;

    for (index; index < allPosters.length; index++) {
      if (allPosters[index].offsetLeft + posterWidth >= visibleRange) {
        lastVisiblePoster = allPosters[index];
        break;
      }
    }

    if (!lastVisiblePoster && allPosters.length > 0) {
      lastVisiblePoster = allPosters[allPosters.length - 1];
    }

    if (lastVisiblePoster) {
      let scrollDistance =
        direction === 'forward'
          ? lastVisiblePoster.offsetLeft - elementToScroll.scrollLeft
          : lastVisiblePoster.offsetLeft +
            posterWidth -
            elementToScroll.scrollLeft; // this won't make the last visible element the first visible element on next scroll

      elementToScroll.scrollBy({
        top: 0,
        left: direction === 'forward' ? +scrollDistance : -scrollDistance,
        behavior: 'smooth',
      });

      setCanScrollPrev(rowIndex);

      if (direction === 'forward') {
        if (activeIndex === maxScrollPosition) return;
        setActiveIndex((prev) => (prev += 1));
      } else {
        if (activeIndex > 0) {
          setActiveIndex((prev) => (prev -= 1));
        }
      }
    }
  };

  const CARDS = movies?.map((movie, idx) => (
    <MovieCard
      index={idx}
      movie={movie}
      src={`${baseImgUrl}${
        isLargeRow ? movie.poster_path : movie.backdrop_path
      }`}
      isLargeRow={isLargeRow}
      alt={movie.name}
      key={movie.id}
      className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
    />
  ));

  return (
    <StyledRow aria-label="movies row" ref={rowRef}>
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
          className="slider__nav prev"
          onClick={() => onNavigate('backward')}
        >
          <span className="icon">
            <ArrowBackIcon />
          </span>
        </button>
      )}
      <div className="row__posters">{CARDS}</div>
      <button
        className="slider__nav next"
        onClick={() => onNavigate('forward')}
      >
        <span className="icon">
          <ArrowForwardIcon />
        </span>
      </button>
    </StyledRow>
  );
}
