// import
import React from 'react';

import '@admin/utils/lib/styles';
import { appWithTranslation } from '@meepshop/locales';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import withApollo from '@admin/apollo';
import CurrencyProvider from '@admin/currency';
import Wrapper from '@admin/wrapper';

import MockTypes from './index';

// definition
const AdminWrapper = process.env.STORYBOOK_ENV
  ? Wrapper
  : React.memo(({ children }) => <>{children}</>);

export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => (
      <MockTypes>
        <AppsProvider>
          <CurrencyProvider>
            <AdminWrapper>{children}</AdminWrapper>
          </CurrencyProvider>
        </AppsProvider>
      </MockTypes>
    )),
  ),
);
