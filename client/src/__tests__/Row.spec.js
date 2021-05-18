import { render } from '@testing-library/react';
import Nav from '../components/shared/Layout/Navbar/Nav';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { ContextProvidersNest } from '../context/ContextProvidersNest';

const history = createMemoryHistory();

const superRender = (Component) =>
  render(
    <Router history={history}>
      <ContextProvidersNest>
        <Route component={Component} />
      </ContextProvidersNest>
    </Router>
  );
