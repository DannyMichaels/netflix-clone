import styled from 'styled-components';

export const StyledRow = styled.div`
  margin-left: 20px;

  .row__posters {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
  }

  .row__posters::-webkit-scrollbar {
    display: none;
  }

  .row__poster {
    object-fit: contain;
    transition: transform 450ms;
    width: 100%;
    max-height: 100px;

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }

  .row__poster:hover {
    transform: scale(1.08);
    opacity: 1;
  }

  .row__posterLarge {
    max-height: 250px;
  }

  .row__posterLarge:hover {
    transform: scale(1.09);
    opacity: 1;
  }
`;
