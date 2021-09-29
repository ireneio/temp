// import
import React, { useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import Cname from '../Cname';
import Sender from '../Sender';
import Interface from '../Interface';
import Domain from '../Domain';
import StoreStatus from '../StoreStatus';

// graphql typescript
import { useBlockFragment as useBlockFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { cnameFragment } from '../gqls/cname';
import { interfaceFragment } from '../gqls/interface';

// definition
export default (
  store: useBlockFragmentType | null,
): {
  key: string;
  component: React.ReactNode;
}[] => {
  return useMemo(
    () => [
      {
        key: 'cname',
        component: <Cname store={filter(cnameFragment, store)} />,
      },
      {
        key: 'sender',
        component: <Sender />,
      },
      {
        key: 'interface',
        component: <Interface store={filter(interfaceFragment, store)} />,
      },
      {
        key: 'domain',
        component: <Domain />,
      },
      {
        key: 'store-status',
        component: <StoreStatus />,
      },
    ],
    [store],
  );
};
