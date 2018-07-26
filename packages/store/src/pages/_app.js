import React from 'react';
import App, { Container } from 'next/app';
import * as Utils from 'utils';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { notification } from 'antd';
import { Error } from 'components';
import configureStore from 'ducks/store';
import getConfig from 'next/config';
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

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const { XMeepshopDomain, userAgent, cookie = null } = Utils.getReqArgs(
      ctx.isServer,
      ctx.req,
    );
    /* Check 401 error */
    if (ctx.isServer) {
      const XMeepshopDomainToken = Utils.getCookie(
        'x-meepshop-authorization-token',
        cookie,
      );
      const response = await fetch(`${API_HOST}/graphql`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-meepshop-domain': XMeepshopDomain,
          'x-meepshop-authorization-token': XMeepshopDomainToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          query: `query checkStore {
          getStoreList {
            data {
              cname
            }
          }
        }`,
        }),
      });
      if (response.status === 401) {
        console.warn(`${response.status} - ${XMeepshopDomain}`);
        ctx.res.cookie('x-meepshop-authorization-token', '', {
          httpOnly: true,
        });
        ctx.res.writeHead(302, {
          Location: `//${ctx.req.headers.host}`,
        });
        ctx.res.end();
        ctx.res.finished = true;
        return {};
      }
    } /* Check 401 error - End */

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
  }

  render() {
    const { Component, pageProps, router, store } = this.props;
    const url = { asPath: router.asPath, query: router.query };
    return this.state.error ? (
      <Error error={this.state.error} errorInfo={this.state.errorInfo} />
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
