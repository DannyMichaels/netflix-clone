import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BellIcon from '@material-ui/icons/Notifications';

const StyledNav = styled.nav`
  background: ${({ isShowing }) => isShowing && '#141414'};
  top: 0;
  z-index: 9999;
  position: fixed;
  width: 100%;
  display: flex;
  padding: 20px;
  height: 30px;
  transition-timing-function: ease-in;
  transition: all 0.5s;

  .nav__innerColumn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    max-width: 1900px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 4%;
  }

  .nav__logo {
    width: 80px;
    object-fit: contain;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
  }

  .nav__avatar {
    width: 30px;
    object-fit: contain;
  }

  .nav__secondaryNavigation {
    display: flex;
    align-items: center;
    padding: 20px;
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
      <div className="nav__innerColumn">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
        <div className="nav__secondaryNavigation">
          <BellIcon />
          <img
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile Pic"
          />
        </div>
      </div>
    </StyledNav>
  );
}
