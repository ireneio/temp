import React from 'react';
import ErrorPageNotFound from '../ErrorPageNotFound';
import ErrorProductNotFound from '../ErrorProductNotFound';
import oopsImg from './images/oops.png';

const getErrorMsg = _error => {
  if (!_error) return '';

  let error;
  if (typeof _error === 'object') {
    error = _error.message;
  } else if (typeof _error === 'string') {
    error = _error;
  } else {
    error = '';
  }

  if (error.match(/token verify failed/gm)) {
    return 'Store not found.';
  }
  return 'Something went wrong.';
};

export default (
  { error, errorInfo }, // eslint-disable-line
) => {
  if (error === 'ERROR_PAGE_NOT_FOUND') return <ErrorPageNotFound />;
  if (error === 'ERROR_PRODUCT_NOT_FOUND') return <ErrorProductNotFound />;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#9e9e9e',
          fontSize: '24px',
        }}
      >
        <img style={{ paddingTop: 150, width: 110 }} src={oopsImg} alt="oops" />
        <div style={{ textAlign: 'center' }}>
          <div>{getErrorMsg(error)}</div>
          {errorInfo ? (
            <details
              open
              style={{
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
                fontSize: 14,
              }}
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
    </>
  );
};
