// import
import React from 'react';

import runTest from '@meepshop/mock-types/src/runTest';

import Checkout from '../index';

// typescript definition
import { getRecipientAddressBook_viewer_recipientAddressBook as getRecipientAddressBookViewerRecipientAddressBook } from '../__generated__/getRecipientAddressBook';

// definition
runTest(
  'store',
  <Checkout>
    {({
      recipientAddressBook,
    }: {
      recipientAddressBook: getRecipientAddressBookViewerRecipientAddressBook[];
    }) => <div>{JSON.stringify(recipientAddressBook)}</div>}
  </Checkout>,
);
