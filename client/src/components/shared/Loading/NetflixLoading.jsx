import React from 'react';
import { CircularProgressLoading } from './CircularProgressLoading';

import styled from 'styled-components';
import { COLORS } from '../../../utils/generalUtils';

const Wrapper = styled.div`
  background: ${COLORS.BLACK};

  // how to center a div : ^)
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;

  img {
    width: 25vw;
  }
`;

export default function NetflixLoading() {
  return (
    <Wrapper className="centered">
      <img
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt="netflix-logo"
      />
      <CircularProgressLoading thickness={1} size={'10vw'} />
    </Wrapper>
  );
}
