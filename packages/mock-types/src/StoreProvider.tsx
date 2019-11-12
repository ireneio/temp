import React from 'react';

import { CurrencyProvider } from '@store/currency';
import { AdTrackProvider } from '@store/ad-track';

export default React.memo(({ children }) => (
  <CurrencyProvider currency="TWD">
    <AdTrackProvider>{children}</AdTrackProvider>
  </CurrencyProvider>
));
