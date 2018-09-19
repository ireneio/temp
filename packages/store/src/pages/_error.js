import React from 'react';
import PropTypes from 'prop-types';
import HTTPStatus from 'http-status';
import Head from 'next/head';
import ErrorPageNotFound from 'components/Error/ErrorPageNotFound';

const styles = {
  error: {
    color: '#000',
    background: '#fff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle',
  },

  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top',
  },

  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
  },
};

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null; // eslint-disable-line
    return { statusCode };
  }

  static propTypes = {
    statusCode: PropTypes.number.isRequired,
  };

  render() {
    const { statusCode } = this.props;
    if (statusCode === 404) return <ErrorPageNotFound />;

    const title = HTTPStatus[statusCode] || 'An unexpected error has occurred';

    return (
      <div style={styles.error}>
        <Head>
          <title>
            {statusCode} {title}
          </title>
        </Head>
        <div>
          {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
          <div style={styles.desc}>
            <h2 style={styles.h2}>{title}.</h2>
          </div>
        </div>
      </div>
    );
  }
}
