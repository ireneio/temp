import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';

import initApollo from './initApollo';
import changeLanguage from './changeLanguage';

export default App =>
  class WithApollo extends React.Component {
    static propTypes = {
      apolloState: PropTypes.shape({}).isRequired,
    };

    static getInitialProps = async ctx => {
      const {
        Component,
        router,
        ctx: { res },
      } = ctx;
      const apollo = initApollo({}, ctx.ctx);

      if (!process.browser) {
        try {
          await changeLanguage(apollo, ctx.ctx);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error while changing language', e);
        }
      }

      const appProps = await App?.getInitialProps(ctx);

      if (res?.finished) return {};

      if (!process.browser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error while running `getDataFromTree`', e);
        }

        Head.rewind();
      }

      const apolloState = apollo.extract();

      return {
        ...appProps,
        apolloState,
      };
    };

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
