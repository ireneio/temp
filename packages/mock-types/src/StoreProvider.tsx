// import
import React from 'react';

import { EventsProvider } from '@meepshop/events';
import { CurrencyProvider } from '@store/currency';
import { AdTrackProvider } from '@store/ad-track';

// definition
export default React.memo(({ children }) => (
  <EventsProvider>
    <CurrencyProvider cookieCurrency="TWD">
      <AdTrackProvider>{children}</AdTrackProvider>
    </CurrencyProvider>
  </EventsProvider>
));
