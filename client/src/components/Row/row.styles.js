import styled from 'styled-components';

export const StyledRow = styled.div`
  .row__posters {
    display: flex;
  }

  .row__poster {
    object-fit: contain;
    width: 100%;
    max-height: 100px;
    transition: transform 450ms;
  }

  .row__poster:not(:last-of-type) {
    margin-right: 10px;
  }

  .row__poster:hover {
    transform: scale(1.08);
    opacity: 1;
  }
`;
