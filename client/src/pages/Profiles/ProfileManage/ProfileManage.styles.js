import styled from 'styled-components';
import { COLORS } from '../../../utils/generalUtils';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.BRIGHT_BLACK};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 100;
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .manageProfile__centeredDiv {
    opacity: 1;
    transform: scale(1);
    transition-duration: 450ms;
    transition-delay: 200ms;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .manageProfile__actionsContainer {
    display: block;
    text-align: left;
    position: relative;

    h1 {
      font-size: 4vw;
      margin: 0;
      color: ${COLORS.WHITE};
      font-weight: 400;

      @media screen and (max-width: 800px) {
        font-size: 40px;
      }
    }

    .manageProfile__metaData {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      padding: 2em 0;

      &.entry {
        border-top: 1px solid #333;
        border-bottom: 1px solid #333;
      }

      .profile__avatar {
        white-space: nowrap;
        margin-right: 1.5vw;
        width: 8vw;
        min-width: 80px;
        max-width: 180px;
      }

      .avatar__box {
        position: relative;
      }

      .avatar__img {
        opacity: 1;
        transform: scale(1);
        transition-duration: 400ms;
        height: 8vw;
        width: 8vw;
        max-height: 180px;
        max-width: 180px;
        min-height: 80px;
        min-width: 80px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
      }
    }
  }
`;
