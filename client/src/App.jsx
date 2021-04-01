import { useContext } from 'react';
import './App.css';
import NetflixLoading from './components/shared/Loading/NetflixLoading';
import { MoviesStateContext } from './context/movies/moviesContext';
import AppRouter from './router/AppRouter';

const App = () => {
  const { moviesAreLoading } = useContext(MoviesStateContext);

  if (moviesAreLoading) {
    return <NetflixLoading />;
  }

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
