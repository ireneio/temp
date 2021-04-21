// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import Cname from '../Cname';
import Sender from '../Sender';
import Interface from '../Interface';
import Domain from '../Domain';
import StoreStatus from '../StoreStatus';

// graphql typescript
import {
  useBlockFragment as useBlockFragmentType,
  cnameFragment as cnameFragmentType,
  senderFragment as senderFragmentType,
  interfaceFragment as interfaceFragmentType,
  domainFragment as domainFragmentType,
  storeStatusFragment as storeStatusFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { cnameFragment } from '../gqls/cname';
import { senderFragment } from '../gqls/sender';
import { interfaceFragment } from '../gqls/interface';
import { domainFragment } from '../gqls/domain';
import { storeStatusFragment } from '../gqls/storeStatus';

// definition
export default (
  form: FormComponentProps['form'],
  setting: useBlockFragmentType | null,
): {
  key: string;
  component: React.ReactNode;
}[] => {
  return useMemo(
    () => [
      {
        key: 'cname',
        component: (
          <Cname
            form={form}
            setting={filter<cnameFragmentType>(cnameFragment, setting)}
          />
        ),
      },
      {
        key: 'sender',
        component: (
          <Sender
            form={form}
            setting={filter<senderFragmentType>(senderFragment, setting)}
          />
        ),
      },
      {
        key: 'interface',
        component: (
          <Interface
            form={form}
            setting={filter<interfaceFragmentType>(interfaceFragment, setting)}
          />
        ),
      },
      {
        key: 'domain',
        component: (
          <Domain
            form={form}
            setting={filter<domainFragmentType>(domainFragment, setting)}
          />
        ),
      },
      {
        key: 'store-status',
        component: (
          <StoreStatus
            form={form}
            setting={filter<storeStatusFragmentType>(
              storeStatusFragment,
              setting,
            )}
          />
        ),
      },
    ],
    [form, setting],
  );
};
