import { Switch, Route } from 'react-router';

// utils
import { ROUTES } from '../utils/navigation';

// pages
import Home from '../pages/Browse/Home/Home';
import MoviePlaybackView from '../pages/MoviePages/MoviePlaybackView';
import BrowseByCategoryAndId from '../pages/Browse/ByCategoryAndId/BrowseByCategoryAndId';
import ProfileSelect from '../pages/Profiles/ProfileSelect/ProfileSelect';
import ProfileManage from '../pages/Profiles/ProfileManage/ProfileManage';
import PrivateRoute from './PrivateRoute';
import ProfileCreate from '../pages/Profiles/ProfileCreate/ProfileCreate';
import MyList from '../pages/Browse/MyList/MyList';

const AppRouter = () => (
  <Switch>
    <Route exact path={ROUTES.SELECT_PROFILE} component={ProfileSelect} />
    <Route exact path={ROUTES.MANAGE_PROFILE} component={ProfileManage} />
    <Route exact path={ROUTES.CREATE_PROFILE} component={ProfileCreate} />

    <PrivateRoute exact path={ROUTES.BROWSE_ALL} component={Home} />
    <PrivateRoute
      path={[ROUTES.BROWSE_BY_GENRE, ROUTES.BROWSE_BY_PERSON]}
      component={BrowseByCategoryAndId}
    />
    <PrivateRoute exact path={ROUTES.MY_LIST} component={MyList} />
    <PrivateRoute path={ROUTES.MOVIE_PLAYBACK} component={MoviePlaybackView} />
  </Switch>
);

export default AppRouter;
