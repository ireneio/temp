import React from 'react';

import { CurrencyProvider } from '@store/currency';

export default React.memo(({ children }) => (
  <CurrencyProvider currency="TWD">{children}</CurrencyProvider>
));
