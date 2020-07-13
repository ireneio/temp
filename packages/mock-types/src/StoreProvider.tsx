// import
import React from 'react';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { EventsProvider } from '@meepshop/events';
import * as resolvers from '@store/apollo';
import FbProvider from '@store/fb';
import { CurrencyProvider } from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import MockTypes from './index';

// definition
export default appWithTranslation(
  React.memo(({ children }) => (
    <MockTypes {...resolvers}>
      <EventsProvider>
        <FbProvider>
          <CurrencyProvider cookieCurrency="TWD">
            <AdTrackProvider>{children}</AdTrackProvider>
          </CurrencyProvider>
        </FbProvider>
      </EventsProvider>
    </MockTypes>
  )),
);
