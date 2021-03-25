import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../utils/navigation';
import Home from '../pages/Home/Home';
import MoviePlaybackView from '../pages/MoviePages/MoviePlaybackView';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.MOVIE_PLAYBACK} component={MoviePlaybackView} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
