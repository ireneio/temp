// import
import React from 'react';

import { appWithTranslation } from '@meepshop/utils/lib/i18n';
import { EventsProvider } from '@meepshop/events';
import withApollo from '@store/apollo';
import FbProvider from '@store/fb';
import { CurrencyProvider } from '@store/currency';
import AdTrackProvider from '@store/ad-track';

import MockTypes from './index';

// definition
export default withApollo(
  appWithTranslation(
    React.memo(({ children }) => (
      <EventsProvider>
        <FbProvider>
          <CurrencyProvider cookieCurrency="TWD">
            <AdTrackProvider>
              <MockTypes>{children}</MockTypes>
            </AdTrackProvider>
          </CurrencyProvider>
        </FbProvider>
      </EventsProvider>
    )),
  ),
);
