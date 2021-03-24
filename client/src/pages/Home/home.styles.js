import styled from 'styled-components';

export const InnerColumn = styled.div`
  display: block;
  width: 98%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    grid-gap: 20px;
    list-style: none;

    img {
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

      @media screen and (min-width: 600px) {
        max-width: 100%;
      }

      &:hover {
        transform: scale(1.08);
        opacity: 1;
        z-index: 3;
      }
    }
  }
`;
