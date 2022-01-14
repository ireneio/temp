// FIXME: should remove this component
// typescript import
import { AppInitialProps, AppContext } from 'next/app';

// import
import React from 'react';
import NextApp from 'next/app';

import { appWithTranslation } from '@meepshop/locales';
import { appWithDomain, getServerSideDomainContextProps } from '@meepshop/link';

// definition
class SSR extends NextApp {
  public static getInitialProps = async ({
    ctx,
    router,
  }: AppContext): Promise<AppInitialProps> => ({
    ...getServerSideDomainContextProps(ctx, router),
    pageProps: { namespacesRequired: ['common'] },
  });

  public render(): React.ReactElement {
    const { children } = this.props;

    return <>{children}</>;
  }
}

export default appWithTranslation(appWithDomain(SSR));
