import React from 'react';
import ErrorPageNotFound from './ErrorPageNotFound';
import ErrorProductNotFound from './ErrorProductNotFound';
import ApiError from './ApiError';
import ServerError from './ServerError';
import oopsImg from './images/oops.png';

// eslint-disable-next-line react/prop-types
export default ({ error }) => {
  const { status } = error;

  if (status === 'ERROR_PAGE_NOT_FOUND') return <ErrorPageNotFound />;
  if (status === 'ERROR_PRODUCT_NOT_FOUND') return <ErrorProductNotFound />;
  if (status === 'API_ERROR') return <ApiError />;
  if (status === 'SERVER_ERROR') return <ServerError />;
  if (status === 'SAGA_PAGES') return <ServerError />;
  if (status === 'SAGA_PRODUCTS') return <ServerError />;

  return (
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
        <h1>Unexpected error.</h1>
      </div>
    </div>
  );
};
