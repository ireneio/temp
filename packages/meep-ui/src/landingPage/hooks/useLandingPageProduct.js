import { useQuery } from '@apollo/client';

import { getLandingPageProduct } from '../gqls/useLandingPageProduct';

export default ids => {
  const { data, loading } = useQuery(getLandingPageProduct, {
    variables: {
      search: {
        size: 1,
        from: 0,
        filter: {
          and: [
            {
              type: 'ids',
              ids: [ids],
            },
          ],
        },
        sort: [
          {
            field: 'createdAt',
            order: 'desc',
          },
        ],
        showVariants: true,
        showMainFile: true,
      },
      first: 10,
    },
    skip: !ids,
  });

  return {
    product: data?.computeProductList?.data?.[0],
    orders: data?.viewer.orders || null,
    loading,
  };
};
