import React from 'react';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import Head from 'next/head';

import initApollo from './initApollo';

export default App =>
  class WithApollo extends React.Component {
    static propTypes = {
      apolloState: PropTypes.shape({}).isRequired,
    };

    static async getInitialProps({ Component, router, ctx }) {
      const { res } = ctx;
      const apollo = initApollo({}, ctx);

      ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps({ Component, router, ctx });
      }

      if (res && res.finished) return {};

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
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
