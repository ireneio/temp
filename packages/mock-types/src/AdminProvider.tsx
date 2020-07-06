// import
import React from 'react';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { EventsProvider } from '@meepshop/events';
import * as resolvers from '@admin/apollo';
import Wrapper from '@admin/wrapper';

import MockTypes from './index';

// definition
const AdminWrapper = process.env.STORYBOOK_ENV
  ? Wrapper
  : React.memo(({ children }) => <>{children}</>);

export default appWithTranslation(
  React.memo(({ children }) => (
    <MockTypes {...resolvers}>
      <EventsProvider>
        <AdminWrapper>{children}</AdminWrapper>
      </EventsProvider>
    </MockTypes>
  )),
);
