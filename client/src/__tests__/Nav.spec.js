import { render } from '@testing-library/react';
import Nav from '../components/shared/Layout/Navbar/Nav';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { ContextProvidersNest } from '../context/ContextProvidersNest';

const history = createMemoryHistory();

const NETFLIX_LOGO =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png';

const superRender = (Component) =>
  render(
    <Router history={history}>
      <ContextProvidersNest>
        <Route component={Component} />
      </ContextProvidersNest>
    </Router>
  );

describe('Navbar left', () => {
  it('contains the links', () => {
    const { getByText } = superRender(Nav);
    ['Home', 'TV Shows', 'New & Popular', 'My List'].map((text) => {
      return expect(getByText(text)).toBeInTheDocument();
    });
  });
  it('contains Netflix logo', () => {
    const { container } = superRender(Nav);
    const navLogo = container.querySelector('.nav__logo');
    expect(navLogo.src).toBe(NETFLIX_LOGO);
  });
});
