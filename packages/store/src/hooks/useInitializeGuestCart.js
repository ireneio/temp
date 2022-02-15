// import
import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

// graphql import
import { useInitializeGuestCartFragment } from '../gqls/useInitializeGuestCart';

// definition
export default viewerId => {
  const client = useApolloClient();

  useEffect(() => {
    client.writeFragment({
      id: viewerId /* SHOULD_NOT_BE_NULL */,
      fragment: useInitializeGuestCartFragment,
      fragmentName: 'useInitializeGuestCartFragment',
      data: {
        __typename: 'User',
        id: viewerId /* SHOULD_NOT_BE_NULL */,
        guestCart: {
          __typename: 'GuestCart',
          cartItems: JSON.parse(localStorage.getItem('guestCart') || '[]'),
        },
      },
    });
  }, [viewerId, client]);
};
