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
import { Dropdown, StyledNav } from './Nav.styles';

// context
import { SearchContext } from '../../../../context/search/searchContext';
import { ProfilesStateContext } from '../../../../context/profiles/profilesContext';
import { CurrentProfileContext } from '../../../../context/profiles/CurrentProfileContext';

export default function Nav({ onlyLogo }) {
  const [isBackgroundShowing, setIsBackgroundShowing] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);

  const { search, setSearch, handleSearch, browseName } = useContext(
    SearchContext
  );

  const { profiles } = useContext(ProfilesStateContext);
  const [currentProfile, setCurrentProfile] = useContext(CurrentProfileContext);

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

  const handleOpenDropdown = () => {
    setIsDropdownShowing(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownShowing(false);
  };

  const handleClickAway = () => {
    search ? setSearchMode(true) : setSearchMode(false);
  };

  const onSignOut = async (text) => {
    if (!text.includes('Sign out of Netflix')) return;
    setCurrentProfile(null);
    localStorage.setItem('selectedProfile', null);
    push(ROUTES.SELECT_PROFILE);
  };

  const onRedirectToManageProfile = () => {
    push({
      pathname: ROUTES.SELECT_PROFILE,
      state: {
        manageModeProps: true,
      },
    });
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
          <>
            <img
              onClick={() => push(ROUTES.BROWSE_ALL)}
              className="nav__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
              alt="Netflix Logo"
            />
          </>

          {!onlyLogo && (
            <>
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
                  onMouseEnter={handleOpenDropdown}
                  onMouseLeave={handleCloseDropdown}
                >
                  <img
                    className="nav__avatar"
                    src={currentProfile.imgUrl}
                    alt={`${currentProfile.name}'s avatar`}
                  />

                  <Box mx={1}>
                    <ArrowDropUpIcon
                      className={`nav__icon arrow ${
                        isDropdownShowing && 'active'
                      }`}
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
                          {profiles?.map((user) => (
                            <li key={user.id}>
                              <img
                                className="nav__avatar"
                                src={user.imgUrl}
                                alt={user.name}
                              />

                              <span>{user.name}</span>
                            </li>
                          ))}
                          <li>
                            <span onClick={onRedirectToManageProfile}>
                              Manage Profiles
                            </span>
                          </li>
                        </div>
                        <div className="hr" />
                        <div className="dropDown__items">
                          {[
                            'Account',
                            'Help Center',
                            'Sign out of Netflix',
                          ].map((text, idx) => (
                            <li onClick={() => onSignOut(text)} key={idx}>
                              <span>{text}</span>
                            </li>
                          ))}
                        </div>
                      </div>
                    </Dropdown>
                  </>
                </div>
              </div>
            </>
          )}
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
