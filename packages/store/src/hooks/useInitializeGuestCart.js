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
      // FIXME: T10004, use cache.identify
      id: viewerId || '$ROOT_QUERY.viewer',
      fragment: useInitializeGuestCartFragment,
      fragmentName: 'useInitializeGuestCartFragment',
      data: {
        __typename: 'User',
        id: viewerId || '$ROOT_QUERY.viewer',
        guestCart: {
          __typename: 'GuestCart',
          cartItems: JSON.parse(localStorage.getItem('guestCart') || '[]'),
        },
      },
    });
  }, [viewerId, client]);
};
