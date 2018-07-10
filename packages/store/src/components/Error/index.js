import React from 'react';
import oopsImg from './images/oops.png';

export default (
  { error }, // eslint-disable-line
) => (
  <div
    style={{
      display: 'flex',
      padding: 200,
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <img src={oopsImg} alt="oops" />
    <h1>{error}</h1>
  </div>
);
