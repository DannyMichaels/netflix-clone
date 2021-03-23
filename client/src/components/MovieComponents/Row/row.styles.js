import styled from 'styled-components';

export const StyledRow = styled.div`
  margin-left: 20px;

  .row__title {
    font-size: 1.4vw;
    color: #e5e5e5;
    font-weight: 700;
    margin: 0 4% 0.5em 4%;
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
    margin: 0;
    padding: 0 4%;
  }

  .row__posters::-webkit-scrollbar {
    display: none;
  }

  .poster__container {
    width: 50px;
  }

  .row__poster {
    object-fit: contain;
    transition: transform 450ms;
    width: 100%;
    max-height: 100px;

    box-sizing: border-box;
    z-index: 1;
    display: inline-block;
    position: relative;
    white-space: normal;
    vertical-align: top;
    padding: 0 2px;
    border-radius: 4px;
  }

  .row__poster:hover {
    transform: scale(1.08);
    opacity: 1;
  }

  .row__posterLarge {
    width: 100%;
    /* max-height: 480px; */
    max-height: 300px;

    max-width: 150px;
    top: 0;
    left: 0;
  }

  .row__posterLarge:hover {
    transform: scale(1.09);
    opacity: 1;
  }
`;
