// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import Checkout from '../index';

// typescript definition
import { getRecipientAddressBook_viewer_shippableRecipientAddresses as getRecipientAddressBookViewerShippableRecipientAddresses } from '../__generated__/getRecipientAddressBook';

// definition
runTest(
  'store',
  <Checkout>
    {({
      shippableRecipientAddresses,
    }: {
      shippableRecipientAddresses: getRecipientAddressBookViewerShippableRecipientAddresses[];
    }) => <div>{JSON.stringify(shippableRecipientAddresses)}</div>}
  </Checkout>,
);
