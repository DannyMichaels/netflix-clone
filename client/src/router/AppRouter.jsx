import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// utils
import { ROUTES } from '../utils/navigation';

// pages
import Home from '../pages/Browse/Home/Home';
import MoviePlaybackView from '../pages/MoviePages/MoviePlaybackView';
import BrowseByCategoryAndId from '../pages/Browse/ByCategoryAndId/BrowseByCategoryAndId';
import ProfileSelect from '../pages/Profiles/ProfileSelect/ProfileSelect';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.SELECT_PROFILE} component={ProfileSelect} />
      <Route exact path={ROUTES.BROWSE_ALL} component={Home} />
      <Route
        path={[ROUTES.BROWSE_BY_GENRE, ROUTES.BROWSE_BY_PERSON]}
        component={BrowseByCategoryAndId}
      />
      <Route path={ROUTES.MOVIE_PLAYBACK} component={MoviePlaybackView} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
