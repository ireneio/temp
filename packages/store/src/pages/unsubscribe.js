import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';

import UnsubscribeEmail from '@store/unsubscribe-email';

import * as Utils from 'utils';
import * as Actions from 'ducks/actions';

class UnsubscribeEmailPage extends React.PureComponent {
  static getInitialProps = async context => {
    const { store } = context;
    const result = await UnsubscribeEmail.getInitialProps();

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

    return result;
  };

  render() {
    const {
      storeSetting: { storeName, faviconUrl },
    } = this.props;

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>

        <UnsubscribeEmail />
      </>
    );
  }
}

const mapStateToProps = state => ({
  storeSetting: state.storeReducer.settings,
  isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
});

export default connect(mapStateToProps)(UnsubscribeEmailPage);
