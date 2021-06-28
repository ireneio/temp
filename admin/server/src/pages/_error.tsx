// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import NextError from 'next/error';

// typescript definition
interface PropsType {
  statusCode: number;
}

// definition
// FIXME: https://github.com/vercel/next.js/issues/23128
const Error: NextPage<PropsType> = React.memo(({ statusCode }) => (
  <NextError statusCode={statusCode} />
));

Error.getInitialProps = async ({ res }) => ({
  statusCode: res?.statusCode || 500,
});

export default Error;
