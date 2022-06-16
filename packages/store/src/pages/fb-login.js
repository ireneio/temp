// import
import React from 'react';

import InAppBrowser from '@store/fb/lib/InAppBrowser';

import { Container } from 'components';
import * as Template from 'template';

const InAppBrowserPage = React.memo(props => {
  const page = {
    id: 'fb-login-in-app-browser',
    container: 'DefaultContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  };

  return (
    <Container {...props} page={page}>
      <InAppBrowser />
    </Container>
  );
});

InAppBrowserPage.getInitialProps = async () => {
  return {
    namespacesRequired: [],
  };
};

export default InAppBrowserPage;
