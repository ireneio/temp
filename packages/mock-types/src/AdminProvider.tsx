// import
import React from 'react';

import { EventsProvider } from '@meepshop/events';
import Wrapper from '@admin/wrapper';

// definition
export default React.memo(({ children }) => (
  <EventsProvider>
    <Wrapper>{children}</Wrapper>
  </EventsProvider>
));
