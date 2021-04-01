import { CircularProgressLoading } from './CircularProgressLoading';

import React from 'react';

export default function NetflixLoading() {
  return (
    <div style={{ height: '100vh', background: '#000' }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)', // how to center a div :^)
        }}
      >
        <CircularProgressLoading thickness={5} size={200} />
      </div>
    </div>
  );
}
