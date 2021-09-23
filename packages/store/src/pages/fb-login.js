// import
import React from 'react';
import { connect } from 'react-redux';

import InAppBrowser from '@store/fb/lib/InAppBrowser';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import * as Template from 'template';

const InAppBrowserPage = React.memo(props => {
  const { error } = props;

  if (error) return <Error error={error} />;

  return (
    <Container {...props}>
      <InAppBrowser />
    </Container>
  );
});

InAppBrowserPage.getInitialProps = async context => {
  const { XMeepshopDomain, userAgent } = context;

  return {
    userAgent,
    XMeepshopDomain,
    namespacesRequired: [],
  };
};

const mapStateToProps = (state, props) => {
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {
    location: Utils.uriParser(props),
    page: {
      id: 'fb-login-in-app-browser',
      container: 'DefaultContainer',
      blocks: [],
      fixedtop: Template.fixedtop,
      secondtop: Template.secondtop,
      fixedbottom: Template.fixedbottom,
      sidebar: Template.sidebar,
    },
  };
};

export default connect(mapStateToProps)(InAppBrowserPage);
