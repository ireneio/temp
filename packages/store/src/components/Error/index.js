import React from 'react';
import oopsImg from './images/oops.png';

const getErrorMsg = error => {
  if (!error) return '';
  if (error.message.match(/token verify failed/g)) {
    return 'Store not found.';
  }
  return 'Something went wrong.';
};

export default (
  { error, errorInfo }, // eslint-disable-line
) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#9e9e9e',
      fontSize: '24px',
    }}
  >
    <img style={{ paddingTop: '30%', width: 110 }} src={oopsImg} alt="oops" />
    <div style={{ textAlign: 'center' }}>
      <div>{getErrorMsg(error)}</div>
      {errorInfo ? (
        <details
          style={{ whiteSpace: 'pre-wrap', textAlign: 'left', fontSize: 14 }}
        >
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      ) : (
        <div style={{ fontSize: '14px' }}>{`(${error})`}</div>
      )}
    </div>
  </div>
);
