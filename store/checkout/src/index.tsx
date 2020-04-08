// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';

import useCreateOrder from './hooks/useCreateOrder';

// graphql typescript
import {
  getRecipientAddressBook,
  getRecipientAddressBook_viewer_shippableRecipientAddresses as getRecipientAddressBookViewerShippableRecipientAddresses,
} from './__generated__/getRecipientAddressBook';

// typescript definition
interface PropsType {
  children: (data: {
    shippableRecipientAddresses: getRecipientAddressBookViewerShippableRecipientAddresses[];
    createOrder: ReturnType<typeof useCreateOrder>;
  }) => React.ReactElement;
}

// definition
const query = gql`
  query getRecipientAddressBook {
    viewer {
      id
      shippableRecipientAddresses {
        id
        name
        mobile
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        street
        zipCode
      }
    }
  }
`;

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getRecipientAddressBook>(query);
  const createOrder = useCreateOrder();
  const shippableRecipientAddresses = data?.viewer?.shippableRecipientAddresses;

  if (!shippableRecipientAddresses)
    return <Spin indicator={<Icon type="loading" spin />} />;

  return children({ shippableRecipientAddresses, createOrder });
});
