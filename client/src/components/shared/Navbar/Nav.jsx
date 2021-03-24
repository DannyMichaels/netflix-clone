import { useState, useEffect } from 'react';

// components
import { Box, ClickAwayListener } from '@material-ui/core';

// icons
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

// styles
import { StyledNav } from './nav.styles';

export default function Nav({ handleSearch }) {
  const [isBackgroundShowing, setIsBackgroundShowing] = useState(false);
  const [searchMode, setSearchMode] = useState(false);

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

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  };

  return (
    <StyledNav
      aria-label="navbar"
      isShowing={isBackgroundShowing}
      searchMode={searchMode}
    >
      <div className="nav__innerColumn">
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
        <div className="nav__secondaryNavigation">
          <ClickAwayListener onClickAway={searchMode && toggleSearchMode}>
            <div className="nav__searchContainer">
              <SearchIcon
                className="nav__icon search"
                onClick={toggleSearchMode}
              />
              <input
                onChange={handleSearch}
                placeholder="Titles, people, genres"
                className="nav__searchInput"
              />
            </div>
          </ClickAwayListener>
          <Box mx={2}>
            <BellIcon fontSize="medium" className="nav__icon bell" />
          </Box>

          <img
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile Pic"
          />
          <Box mx={1}>
            <ArrowDropUpIcon className="nav__icon arrow" />
          </Box>
        </div>
      </div>
    </StyledNav>
  );
}
