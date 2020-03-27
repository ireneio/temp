// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';

import useCreateOrder from './hooks/useCreateOrder';

// graphql typescript
import {
  getRecipientAddressBook,
  getRecipientAddressBook_viewer_recipientAddressBook as getRecipientAddressBookViewerRecipientAddressBook,
} from './__generated__/getRecipientAddressBook';

// typescript definition
interface PropsType {
  children: (data: {
    recipientAddressBook: getRecipientAddressBookViewerRecipientAddressBook[];
    createOrder: ReturnType<typeof useCreateOrder>;
  }) => React.ReactElement;
}

// definition
const query = gql`
  query getRecipientAddressBook {
    viewer {
      id
      recipientAddressBook {
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

      # TODO: remove after api can auto filter
      store {
        id
        shippableCountries {
          id
        }
      }
    }
  }
`;

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getRecipientAddressBook>(query);
  const createOrder = useCreateOrder();
  // TODO: remove after api can auto filter
  const shippableCountries = data?.viewer?.store?.shippableCountries || [];
  const recipientAddressBook = data?.viewer?.recipientAddressBook.filter(
    ({ country }) => shippableCountries.some(({ id }) => id === country?.id),
  );

  if (!recipientAddressBook)
    return <Spin indicator={<Icon type="loading" spin />} />;

  return children({ recipientAddressBook, createOrder });
});
