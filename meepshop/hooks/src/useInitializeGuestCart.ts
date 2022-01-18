// import
import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

// graphql typescript
import { useInitializeGuestCartFragment as useInitializeGuestCartFragmentType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { useInitializeGuestCartFragment } from './gqls/useInitializeGuestCart';

// definition
export default (viewerId: string | null): void => {
  const client = useApolloClient();

  useEffect(() => {
    client.writeFragment<useInitializeGuestCartFragmentType>({
      // FIXME: T10004, use cache.identify
      id: viewerId || '$ROOT_QUERY.viewer',
      fragment: useInitializeGuestCartFragment,
      fragmentName: 'useInitializeGuestCartFragment',
      data: {
        __typename: 'User' as const,
        id: viewerId || '$ROOT_QUERY.viewer',
        guestCart: {
          __typename: 'GuestCart',
          cartItems: JSON.parse(localStorage.getItem('guestCart') || '[]'),
        },
      },
    });
  }, [viewerId, client]);
};
