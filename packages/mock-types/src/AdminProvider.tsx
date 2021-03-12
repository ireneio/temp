// import
import React from 'react';

import { appWithTranslation } from '@meepshop/locales';
import { EventsProvider } from '@meepshop/context/lib/Events';
import { AppsProvider } from '@meepshop/context/lib/Apps';
import '@admin/utils/styles/base.less';
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
        <EventsProvider>
          <AppsProvider>
            <CurrencyProvider>
              <AdminWrapper>{children}</AdminWrapper>
            </CurrencyProvider>
          </AppsProvider>
        </EventsProvider>
      </MockTypes>
    )),
  ),
);
