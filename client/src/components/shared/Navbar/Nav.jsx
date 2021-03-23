import styled from 'styled-components';

const StyledNav = styled.nav`
  position: sticky;
  top: 0;

  display: flex;

  .nav__logo {
    width: 80px;
    object-fit: contain;
  }
`;

const Nav = () => (
  <StyledNav aria-label="navbar">
    <img
      className="nav__logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
      alt="Netflix Logo"
    />
    <img
      className="nav__avatar"
      src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
      alt="Profile Pic"
    />
  </StyledNav>
);

export default Nav;
