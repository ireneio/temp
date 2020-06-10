// import
import React from 'react';

import { EventsProvider } from '@meepshop/events';
import FbProvider from '@store/fb';
import { CurrencyProvider } from '@store/currency';
import { AdTrackProvider } from '@store/ad-track';

// definition
export default React.memo(({ children }) => (
  <EventsProvider>
    <FbProvider>
      <CurrencyProvider cookieCurrency="TWD">
        <AdTrackProvider>{children}</AdTrackProvider>
      </CurrencyProvider>
    </FbProvider>
  </EventsProvider>
));
