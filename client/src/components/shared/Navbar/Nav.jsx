import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px;
  height: 30px;
  /* display: flex; */
  /* justify-content: space-between; */
  z-index: 9999;
  background-color: ${({ isShowing }) => isShowing && '#141414'};

  transition-timing-function: ease-in;
  transition: all 0.5s;

  .nav__logo {
    /* position: fixed; */
    /* left: 20px; */
    width: 80px;
    object-fit: contain;
  }

  .nav__avatar {
    /* position: fixed; */
    /* right: 20px; */
    width: 30px;
    object-fit: contain;
  }

  .nav__inner-column {
    display: block;
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 1900px;
    margin-right: auto;
    margin-left: auto;
    border: 2px solid red;
  }
`;

export default function Nav() {
  const [isBackgroundShowing, setIsBackgroundShowing] = useState(false);

  const onScroll = () => {
    if (window.scrollY > 100) {
      setIsBackgroundShowing(true);
    } else setIsBackgroundShowing(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <StyledNav aria-label="navbar" isShowing={isBackgroundShowing}>
      <div className="nav__inner-column">
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
      </div>
    </StyledNav>
  );
}
