import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// utils
import { ROUTES } from '../utils/navigation';

// pages
import Home from '../pages/Home/Home';
import MoviePlaybackView from '../pages/MoviePages/MoviePlaybackView';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.BROWSE_BY_PERSON} component={Home} />
      <Route path={ROUTES.MOVIE_PLAYBACK} component={MoviePlaybackView} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
