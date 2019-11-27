import React from 'react';

import { CurrencyProvider } from '@store/currency';
import { AdTrackProvider } from '@store/ad-track';

export default React.memo(({ children }) => (
  <CurrencyProvider cookieCurrency="TWD">
    <AdTrackProvider>{children}</AdTrackProvider>
  </CurrencyProvider>
));
