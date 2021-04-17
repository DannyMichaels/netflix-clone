import styled from 'styled-components';
import { COLORS } from '../../../utils/generalUtils';

export const StyledRow = styled.div`
  margin: 3vw 0;
  margin-left: 20px;
  /* width: 100%; */
  position: relative;
  scroll-behavior: smooth;

  /* if the parent element is pos: relative and child is pos: absolute
    the child will be positioned around the parent.
    */

  &:hover {
    .slider__nav {
      visibility: visible;
    }
  }

  .slider__nav {
    transition: all 0.2s ease-in;
    visibility: hidden;
    outline: none;
    top: 15px;
    z-index: 3;
    position: absolute;
    display: flex;
    align-items: center;
    height: 100%;
    background: rgba(20, 20, 20, 0.5);

    &:hover {
      background: rgba(20, 20, 20, 0.7);

      .icon {
        font-size: 1.8rem;
        font-weight: 700;
      }
    }

    border: none;
    color: ${COLORS.WHITE};
    width: 4rem;

    .icon {
      font-size: 1.5rem;
      transition: all 250ms ease-in-out;
    }

    &.prev {
      left: 30px;
      .row__gradient {
        background-image: linear-gradient(
          to right,
          #111 30%,
          rgba(24, 24, 24, 0) 100%
        );
      }
    }

    &.next {
      right: -30px;

      .icon {
        /* position: relative;
        right: -100px; */
      }

      .row__gradient {
        background-image: linear-gradient(
          to left,
          #111 30%,
          rgba(24, 24, 24, 0) 100%
        );
        right: 10px;
      }
    }

    .row__gradient {
      height: 100%;
      width: 100px;
      position: relative;
    }
  }

  &:last-of-type {
    padding-bottom: 50px;
    overflow: hidden;
    z-index: 0;
  }

  .row__title {
    font-size: 1.4vw;
    color: #e5e5e5;
    font-weight: 700;
    margin: 0.5em 4% 0.5em 4%;
    text-decoration: none;
    display: inline-block;
    min-width: 6em;
    vertical-align: bottom;
    line-height: 1.25vw;

    @media screen and (max-width: 800px) {
      font-size: 12px;
    }
  }

  .row__posters {
    box-sizing: border-box;
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
    position: relative;
    outline: 0;
    z-index: 2;
    padding-left: 4%;
    padding-right: 4%;
  }

  .row__posters::-webkit-scrollbar {
    display: none;
  }

  .row__poster {
    object-fit: contain;
    transition: transform 450ms;
    max-width: 25vw;
    max-height: 100px;
    box-sizing: border-box;
    z-index: 1;
    display: block;
    position: relative;
    white-space: normal;
    padding: 0 2px;
    border-radius: 4px;
    cursor: pointer;
  }

  .row__posterLarge {
    max-height: 200px;
    max-width: 25vw;
    top: 0;
    left: 0;
    transition: transform 450ms;

    @media screen and (min-width: 600px) {
      max-height: 400px;
      max-width: 25vw;
    }
  }

  .movie__card--parent {
    transition: transform 450ms;
    &:hover {
      transform: scale(1.08);
      opacity: 1;
      z-index: 3;
    }

    .movie__card--extraInfo {
      background: #999;
      border-radius: 0 0 4px 4px;
      height: 2em;
      z-index: 999;
      margin: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
      visibility: inherit;
      opacity: 1;
      transition: 0.2s all ease-in;
    }

    .movie__card--extraInfo.inactive {
      visibility: hidden;
      opacity: 0;
      transition: all 0.2s ease-in;
    }
  }

  .movie__card--parent.large {
    .movie__card--extraInfo {
      background: #999;
      border-radius: 0 0 4px 4px;
      height: 6em;
      z-index: 6;
      margin: 0;
      position: absolute;
      bottom: 0;
      width: 100%;
      visibility: inherit;
      opacity: 1;
      transition: 0.2s all ease-in;
    }

    .movie__card--extraInfo.inactive {
      visibility: hidden;
      opacity: 0;
      transition: all 0.2s ease-in;
    }
  }

  .movie__card--parent.large:hover {
    transform: scale(1.09);
    opacity: 1;
    z-index: 3;
  }
`;
