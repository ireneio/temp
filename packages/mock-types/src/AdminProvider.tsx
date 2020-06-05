// import
import React from 'react';

import { EventsProvider } from '@meepshop/events';

// definition
export default React.memo(({ children }) => (
  <EventsProvider>{children}</EventsProvider>
));
