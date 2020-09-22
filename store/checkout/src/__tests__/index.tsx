// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import Checkout from '../index';

// typescript definition
import { getCheckoutInfo_viewer_shippableRecipientAddresses as getCheckoutInfoViewerShippableRecipientAddresses } from '../__generated__/getCheckoutInfo';

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
