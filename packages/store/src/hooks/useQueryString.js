// import
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import { useRouter } from '@meepshop/link';
import { useCart } from '@meepshop/hooks';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { getCart } from 'gqls/useQueryString';

// definition
export default () => {
  const router = useRouter();
  const { query, asPath } = router;
  const { data } = useQuery(getCart);
  const { upsertCart, cartItems, mergeCart } = useCart(
    filter(useCartFragment, data?.viewer || null),
  );

  useEffect(() => {
    if (query.amounts && query.products && query.resetCart && query.variants) {
      const { amounts, products, resetCart, variants } = query;

      (async () => {
        if (JSON.parse(resetCart)) {
          const upsertCartItem = products
            .split(',')
            .map((productId, index) => ({
              __typename: 'CartItem',
              productId,
              quantity: parseInt(amounts.split(',')[index], 10),
              variantId: variants.split(',')[index],
            }));

          await upsertCart(upsertCartItem);
        } else {
          const mergeUpsert = products.split(',').reduce(
            (result, productId, index) => [
              ...mergeCart(result, {
                __typename: 'CartItem',
                productId,
                quantity: parseInt(amounts.split(',')[index], 10),
                variantId: variants.split(',')[index],
              }),
            ],
            cartItems,
          );

          await upsertCart(mergeUpsert);
        }

        router.push(asPath.split('?')[0]);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
