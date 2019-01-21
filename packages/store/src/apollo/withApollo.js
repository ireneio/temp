import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';

import initApollo from './initApollo';

export default App =>
  class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;

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
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error);
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
