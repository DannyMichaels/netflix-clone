import { useState, useEffect } from 'react';

// components
import {
  Box,
  ClickAwayListener,
  Input,
  InputAdornment,
} from '@material-ui/core';

// icons
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import BellIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

// styles
import { StyledNav } from './nav.styles';

export default function Nav({ handleSearch, isSearching, setSearch }) {
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

  const onSearchClear = () => {
    setSearch('');
  };

  const handleClickAway = () => {
    !isSearching && toggleSearchMode();
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
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="nav__searchContainer">
              {!searchMode && (
                <SearchIcon
                  className="nav__icon search"
                  onClick={toggleSearchMode}
                />
              )}
              <Input
                onChange={handleSearch}
                value={isSearching}
                placeholder="Titles, people, genres"
                className="nav__searchInput"
                disableUnderline
                startAdornment={
                  <Box marginLeft={1}>
                    <InputAdornment position="start">
                      <SearchIcon className="nav__icon search" />
                    </InputAdornment>
                  </Box>
                }
                endAdornment={
                  <Box mx={1}>
                    <InputAdornment position="end">
                      <ClearIcon
                        onClick={onSearchClear}
                        className="nav__icon"
                      />
                    </InputAdornment>
                  </Box>
                }
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
