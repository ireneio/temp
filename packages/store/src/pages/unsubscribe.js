import React from 'react';

import UnsubscribeEmail from '@store/unsubscribe-email';

import * as Actions from 'ducks/actions';

export default class UnsubscribeEmailPage extends React.PureComponent {
  static getInitialProps = async context => {
    const { store } = context;
    const result = await UnsubscribeEmail.getInitialProps();

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

    return result;
  };

  render() {
    return <UnsubscribeEmail />;
  }
}
