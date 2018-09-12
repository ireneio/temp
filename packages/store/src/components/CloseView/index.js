import React from 'react';
import * as LOCALE from './locale';

export default (
  { locale }, // eslint-disable-line
) => (
  <div
    style={{
      fontSize: 18,
      color: '#666',
      borderRadius: 3,
      letterSpacing: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      padding: '50px 120px',
      background: '#f2f2f2',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {`...${LOCALE.STORE_CLOSE[locale]}...`}
  </div>
);
