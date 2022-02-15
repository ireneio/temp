// import
import React from 'react';
import { SchemaLink } from '@apollo/client/link/schema';

import '@admin/utils/lib/styles';
import { appWithTranslation } from '@meepshop/locales';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import { buildWithApollo } from '@meepshop/apollo';
import { resolvers } from '@admin/apollo';
import CurrencyProvider from '@admin/currency';
import Wrapper from '@admin/wrapper';

import MockTypes from './index';
import schema from './schema';

// definition
const AdminWrapper = process.env.STORYBOOK_ENV
  ? Wrapper
  : React.memo(({ children }) => <>{children}</>);

export default buildWithApollo({
  name: 'admin',
  resolvers,
  terminatingLink: new SchemaLink({ schema }),
})(
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
