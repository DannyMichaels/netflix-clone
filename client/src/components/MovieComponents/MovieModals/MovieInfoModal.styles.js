import styled from 'styled-components';
import { Box, DialogContent } from '@material-ui/core';
import { COLORS } from '../../../utils/generalUtils';

export const StyledGrid = styled.div`
  color: ${COLORS.WHITE};

  h2 {
    user-select: none;
    font-weight: 700;
    font-size: 24px;
    margin-top: 48px;
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 1fr));

    @media screen and (min-width: 360px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    li {
      user-select: none;
      cursor: pointer;
      picture {
        width: 100%;

        img {
          display: block;
          width: 100%;
          border-radius: 4px;
        }
      }
      .modal__recommendedMovie--metaData {
        background-color: ${COLORS.DARK_GREY};
        border-radius: 0 0 4px 4px;
        min-height: 200px;
        max-height: 200px;
        overflow-y: hidden;
        padding: 0 0 0.5rem 0;

        .recommendedMovie__MetaData--firstLine {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          padding: 1em 1em 0;

          h4 {
            display: flex;
            flex: 1;
          }
        }

        p {
          line-height: 20px;
          padding: 0 1em 1em;
          font-size: clamp(0.6rem, 4vw, 0.8rem);
          margin: 0;
          color: ${COLORS.BRIGHT_GREY};
        }
      }
    }
  }
`;

export const StyledBox = styled(Box)`
  cursor: pointer;
  position: absolute;
  right: 2.5%;
  top: 10px;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.VERY_BRIGHT_BLACK};
  width: fit-content;
  height: auto;
  border-radius: 50%;
  padding: 0.4% 0.4% 0% 0.4%;
`;

export const StyledDialogContent = styled(DialogContent)`
  .modal__container {
    @media screen and (min-width: 420px) {
      padding: 0 3em;
    }
    display: block;
  }

  .modal__details--metaData {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    column-gap: 2em;
    -webkit-column-gap: 2em;

    a {
      color: #fff;
      text-decoration: none;
      line-height: 20px;
      word-break: break-word;

      &:hover {
        text-decoration: underline;
      }
    }

    .metaData__left {
      -webkit-box-sizing: inherit;
      -moz-box-sizing: inherit;
      box-sizing: inherit;

      .metaData__left--infoWrapper {
        box-sizing: inherit;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        align-items: center;
        user-select: none;
        .movie__scoreContainer {
          display: flex;
          margin-right: 0.5em;

          .movie__score {
            white-space: unset;
            color: ${COLORS.GREEN};
            display: inline-block;
            font-weight: 700;
          }
        }

        .metaData__secondLine {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .movie__year {
            margin-right: 0.5em;
            font-size: 16px;
          }
        }
      }
    }

    .metaData__right {
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -moz-box-orient: vertical;
      -moz-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;

      .metaData__right--tags {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 10em;
        overflow-y: scroll;
        text-overflow: ellipsis;
        &::-webkit-scrollbar {
          display: none;
        }

        span {
          color: #777;
          user-select: none;
        }
        font-size: 14px;
        line-height: 20px;
        margin: 0.5em;
        margin-left: 0;
        word-break: break-word;
      }
    }
  }
`;

export const StyledVideo = styled.div`
  div {
    pointer-events: none;
  }

  .modal__loading--container {
    height: 400px;
    width: 100%;
    background: ${COLORS.BLACK};
    display: flex;
    justify-content: center;
  }
`;
