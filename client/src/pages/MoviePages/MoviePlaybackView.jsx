import { useEffect } from 'react';
import YouTube from 'react-youtube';
import { withRouter } from 'react-router-dom';

function MoviePlaybackView(props) {
  const {
    location: {
      state: { movie },
    },
  } = props;

  return (
    <div style={{ height: '100vh', background: 'yellow' }}>{movie.title}</div>
  );
}

export default MoviePlaybackView;
