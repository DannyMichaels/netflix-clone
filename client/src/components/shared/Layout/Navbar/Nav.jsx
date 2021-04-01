import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

// utils
import { ROUTES } from '../../../../utils/navigation';

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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// styles
import { Dropdown, StyledNav } from './nav.styles';
import { SearchContext } from '../../../../context/search/searchContext';

export default function Nav() {
  const [isBackgroundShowing, setIsBackgroundShowing] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const { search, setSearch, handleSearch, browseName } = useContext(
    SearchContext
  );
  const { push } = useHistory();

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

  const toggleDropDown = () => {
    setIsDropdownShowing(!isDropdownShowing);
  };

  const handleClickAway = () => {
    search ? setSearchMode(true) : setSearchMode(false);
  };

  return (
    <>
      <StyledNav
        aria-label="navbar"
        isShowing={isBackgroundShowing}
        searchMode={searchMode}
        browseName={browseName}
      >
        <div className="nav__innerColumn">
          <img
            onClick={() => push(ROUTES.HOME)}
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
                  value={search}
                  placeholder="Titles, people, genres"
                  className="nav__searchInput"
                  disableUnderline
                  startAdornment={
                    <Box marginLeft={1}>
                      <InputAdornment position="start">
                        <SearchIcon
                          className="nav__icon search"
                          onClick={toggleSearchMode}
                        />
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
              <BellIcon fontSize="default" className="nav__icon bell" />
            </Box>

            <div
              className="nav__profileContainer"
              onMouseEnter={toggleDropDown}
              onMouseLeave={toggleDropDown}
            >
              <img
                className="nav__avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Profile Pic"
              />

              <Box mx={1}>
                <ArrowDropUpIcon
                  className={`nav__icon arrow ${isDropdownShowing && 'active'}`}
                />
              </Box>

              <>
                <Dropdown
                  isActive={isDropdownShowing}
                  background={isBackgroundShowing}
                >
                  <ArrowDropDownIcon className="nav__dropDown--arrow" />
                  <div className="nav__dropDown">
                    <div className="dropDown__items">
                      {[0, 1, 2, 3].map(() => (
                        <li>
                          <img
                            className="nav__avatar"
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="Profile Pic"
                          />

                          <span>username</span>
                        </li>
                      ))}
                    </div>
                  </div>
                </Dropdown>
              </>
            </div>
          </div>
        </div>
      </StyledNav>
      {browseName && !search && (
        <StyledNav hasBrowseName>
          <div className="nav__innerColumn">
            <h1 className="nav__browseName">{browseName}</h1>
          </div>
        </StyledNav>
      )}
    </>
  );
}
