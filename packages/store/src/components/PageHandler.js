import React from 'react';

import * as Utils from 'utils';

import Page from '@store/page';

export default class PageHandler extends React.PureComponent {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    Utils.logToServer({
      type: 'page error',
      message: error.message,
      stack: errorInfo,
    });
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? children : <Page />;
  }
}
