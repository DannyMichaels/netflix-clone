import styled from 'styled-components';

export const StyledBanner = styled.header`
  color: white;
  object-fit: contain;
  height: 448px;
  background-size: cover;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-position: center center;

  .banner__contents {
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
  }

  .banner__title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }

  .banner__description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
  }

  .banner__button {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 2rem;
    margin-right: 1rem;
    background-color: rgba(51, 51, 51, 0.5);
  }
`;
