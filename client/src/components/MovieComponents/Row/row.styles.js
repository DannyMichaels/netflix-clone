import styled from 'styled-components';

export const StyledRow = styled.div`
  &:not(:last-of-type) {
    margin: 3vw 0;
    margin-left: 20px;
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
    padding: 0 4%;
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
    @media screen and (min-width: 600px) {
      max-width: 100%;
    }
  }

  .row__poster:hover {
    transform: scale(1.08);
    opacity: 1;
    z-index: 3;
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

  .row__posterLarge:hover {
    transform: scale(1.09);
    opacity: 1;
    z-index: 3;
  }
`;
