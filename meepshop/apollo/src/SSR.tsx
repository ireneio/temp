// FIXME: should remove this component
// typescript import
import { AppInitialProps } from 'next/app';

// import
import React from 'react';
import NextApp from 'next/app';

import { appWithTranslation } from '@meepshop/locales';
import { withDomain } from '@meepshop/link';

// definition
class SSR extends NextApp {
  public static getInitialProps = async (): Promise<AppInitialProps> => ({
    pageProps: { namespacesRequired: ['common'] },
  });

  public render(): React.ReactElement {
    const { children } = this.props;

    return <>{children}</>;
  }
}

export default appWithTranslation(withDomain(SSR));
