// import
import React from 'react';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { EventsProvider } from '@meepshop/context/lib/events';
import '@admin/utils/styles/base.less';
import withApollo from '@admin/apollo';
import Wrapper from '@admin/wrapper';

import MockTypes from './index';

// definition
const AdminWrapper = process.env.STORYBOOK_ENV
  ? Wrapper
  : React.memo(({ children }) => <>{children}</>);

export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => (
      <EventsProvider>
        <MockTypes>
          <AdminWrapper>{children}</AdminWrapper>
        </MockTypes>
      </EventsProvider>
    )),
  ),
);
