import React from 'react';
import App, { Container } from 'next/app';
import * as Utils from 'utils';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { notification } from 'antd';
import configureStore from 'ducks/store';
import '../static/global.less';
import '../static/nprogress.less';

notification.config({ placement: 'topRight', duration: 1.5 });

Router.onRouteChangeStart = url => {
  // save previous page
  const { pathname, search } = window.location;
  window.storePreviousPageUrl = `${pathname}${search}`;

  console.log(`Loading: ${url}`);
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
  // page need to scroll to top when sorting in product list
  window.scrollTo(0, 0);
};
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const { XMeepshopDomain, userAgent, cookie = null } = Utils.getReqArgs(
      ctx.isServer,
      ctx.req,
    );
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx,
        XMeepshopDomain,
        userAgent,
        cookie,
      });
    }
    return { pageProps };
  }

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, router, store } = this.props;
    const url = { asPath: router.asPath, query: router.query };
    return this.state.error ? (
      <div>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      </div>
    ) : (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} url={url} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(MyApp));
