import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../utils/navigation';
import Home from '../pages/Home';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
