import './App.css';
import { useContext } from 'react';
import { MoviesStateContext } from './context/movies/moviesContext';
import NetflixLoading from './components/shared/Loading/NetflixLoading';
import AppRouter from './router/AppRouter';

const App = () => {
  const { moviesAreLoading, genresAreLoading } = useContext(MoviesStateContext);

  if (moviesAreLoading || genresAreLoading) {
    return <NetflixLoading />;
  }

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
