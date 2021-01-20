// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import Checkout from '../index';

// graphql typescript
import { getCheckoutInfo_viewer_shippableRecipientAddresses as getCheckoutInfoViewerShippableRecipientAddresses } from '@meepshop/types/gqls/store';

// definition
runTest(
  'store',
  <Checkout>
    {({
      shippableRecipientAddresses,
    }: {
      shippableRecipientAddresses: getCheckoutInfoViewerShippableRecipientAddresses[];
    }) => <div>{JSON.stringify(shippableRecipientAddresses)}</div>}
  </Checkout>,
);
