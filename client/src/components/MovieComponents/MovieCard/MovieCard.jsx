// reuseable card component.
// I could just put the styling here with styled-components, but what if in the future we want to reuse it in a different page?
// therefore we give it a flexible className as props.

const MovieCard = ({ src, alt, className, onClick }) => (
  <>
    <img
      src={src}
      alt={alt}
      className={className ?? 'movie-card'}
      onClick={onClick}
    />
  </>
);

export default MovieCard;
