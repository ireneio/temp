// import
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { useApolloNetworkStatus } from '@meepshop/apollo';
import { useCart } from '@meepshop/hooks';
import filter from '@meepshop/utils/lib/filter';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { getCart, useInitialCartFragment } from '../gqls/useInitialCart';

// definition
export default () => {
  const [mergingCart, setMergingCart] = useState(false);
  const { numPendingQueries } = useApolloNetworkStatus();
  const { data, client } = useQuery(getCart);
  const { cartItems, upsertCart } = useCart(
    useMemo(() => filter(useCartFragment, data?.viewer || null), [data]),
  );

  useEffect(() => {
    if (
      !mergingCart &&
      data?.viewer?.role === 'SHOPPER' &&
      numPendingQueries === 0 &&
      (data?.viewer.guestCart.cartItems || []).length !== 0
    ) {
      setMergingCart(true);

      (async () => {
        await upsertCart(cartItems);
        setMergingCart(false);
      })();
    }
  }, [data, cartItems, mergingCart, upsertCart, numPendingQueries]);

  useEffect(() => {
    client.writeFragment({
      id: data?.viewer?.id || null /* SHOULD_NOT_BE_NULL */,
      fragment: useInitialCartFragment,
      fragmentName: 'useInitialCartFragment',
      data: {
        __typename: 'User',
        id: data?.viewer?.id || null /* SHOULD_NOT_BE_NULL */,
        guestCart: {
          __typename: 'GuestCart',
          cartItems: JSON.parse(localStorage.getItem('guestCart') || '[]'),
        },
      },
    });
  }, [data, client]);
};
