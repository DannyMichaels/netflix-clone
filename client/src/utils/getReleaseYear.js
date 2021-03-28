export const getReleaseYear = (movie) => {
  return (
    movie?.first_air_date?.match(/\d{4}/) || movie?.release_date?.match(/\d{4}/)
  );
};
