// imoprt
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

// graphql import
import { getCartList } from '../gqls/useGetCart';

// definition
export default () => {
  const { data } = useQuery(getCartList);
  const products =
    data?.getCartList?.data?.[0]?.categories?.[0]?.products || [];

  return useMemo(
    () =>
      products.reduce(
        (result, product) => [
          ...result,
          ...(!product?.cartId
            ? []
            : [
                {
                  cartId: product.cartId,
                  productId: product?.productId || '',
                  quantity: product?.quantity || 0,
                  variantId: product?.variantId || '',
                },
              ]),
        ],
        [],
      ),
    [products],
  );
};
