import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { COLORS } from '../../../utils/generalUtils';

export const StyledGrid = styled.div`
  color: ${COLORS.WHITE};
  padding: 20px 4%;
  display: block;
  max-width: 100%;

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
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(40vw, 1fr));

    @media screen and (min-width: 360px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    li {
      picture {
        width: 100%;

        img {
          display: block;
          width: 100%;
          border-radius: 4px;
        }
      }
      .modal__recommendedMovie--description {
        background-color: ${COLORS.DARK_GREY};
        border-radius: 0 0 4px 4px;
        min-height: 50%;

        .sypnosis {
          padding: 1em 1em 1em;
          font-size: clamp(0.6rem, 4vw, 1rem);
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
  top: 8%;
  color: ${COLORS.WHITE};
  background-color: ${COLORS.VERY_BRIGHT_BLACK};
  width: fit-content;
  height: auto;
  border-radius: 50%;
  padding: 0.4% 0.4% 0% 0.4%;
`;
