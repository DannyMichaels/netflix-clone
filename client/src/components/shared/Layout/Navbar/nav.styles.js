import { Card } from '@material-ui/core';
import styled from 'styled-components';
import { COLORS } from '../../../../utils/generalUtils';

export const StyledNav = styled.nav`
  background: ${({ isShowing }) => isShowing && COLORS.BRIGHT_BLACK};
  top: 0;
  z-index: 1000;
  position: ${({ browseName }) => (browseName ? 'relative' : 'fixed')};
  position: ${({ hasBrowseName }) => hasBrowseName && 'sticky'};
  background: ${({ hasBrowseName }) => hasBrowseName && COLORS.BRIGHT_BLACK};
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
    border-radius: 4px;
    cursor: pointer;
  }

  .nav__secondaryNavigation {
    display: flex;
    align-items: center;
    padding-right: 20px;
    color: #fff;
  }

  .nav__icon {
    cursor: pointer;
  }

  .nav__icon.search {
    &:hover {
      cursor: ${({ searchMode }) => (!searchMode ? 'pointer' : 'inherit')};
    }
  }

  .nav__icon.arrow {
    transform: rotate(180deg); // facing downward
    transition: transform 0.2s ease-in-out;

    &.active {
      transform: rotate(360deg); // facing upward, rotating from left.
    }
  }

  .nav__searchContainer {
    display: flex;
    align-items: center;
  }

  .nav__searchInput {
    visibility: ${({ searchMode }) => (!searchMode ? 'hidden' : 'inherit')};
    width: ${({ searchMode }) => (!searchMode ? '0px' : '300px')};

    transition: visibility 50ms ease-in-out;
    transition: width 0.2s ease-in-out;

    border: 1px solid ${COLORS.WHITE};
    background-color: ${COLORS.BLACK};
    color: ${COLORS.WHITE};
    padding: 5px;
    &::placeholder {
      color: ${COLORS.GREY};
    }
  }

  .nav__profileContainer {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .nav__browseName {
    color: #fff;
    font-size: 2.5rem;
    font-size: clamp(1rem, 2vw, 2.5rem);
  }
`;

export const Dropdown = styled(Card)`
  position: absolute;
  min-width: 5em;
  top: 45px;
  right: 2em;
  z-index: 5;
  box-shadow: -3px 5px 17px 1px #000;
  .MuiPaper-root {
    background: black;
    background-color: #999;
  }
  .dropdown-items {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;
