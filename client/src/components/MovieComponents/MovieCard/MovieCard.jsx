// reuseable card component.
// I could just put the styling here with styled-components, but what if in the future we want to reuse it in a different page?
// therefore we give it a flexible className as props.

const MovieCard = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt ?? 'movie-image'}
    className={className ?? 'movie-card'}
  />
);

export default MovieCard;
