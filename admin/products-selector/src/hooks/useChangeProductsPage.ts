// typescript import
import { ComponentProps } from '../constants';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { pageSize } from '../constants';

// graphql typescript
import {
  setAdminProductsCurrent as setAdminProductsCurrentType,
  setAdminProductsCurrentVariables as setAdminProductsCurrentVariablesType,
  useChangeProductsPageFragment as useChangeProductsPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { setAdminProductsCurrent } from '../gqls/useChangeProductsPage';

// typescript definition
interface PropsType extends Pick<ComponentProps, 'fetchMore'> {
  products?: useChangeProductsPageFragmentType | null;
}

// definition
export default ({
  products,
  fetchMore,
}: PropsType): ((newCurrent: number) => void) => {
  const [mutation] = useMutation<
    setAdminProductsCurrentType,
    setAdminProductsCurrentVariablesType
  >(setAdminProductsCurrent);

  return useCallback(
    (newCurrent: number): void => {
      if (!products) return;

      const {
        edges,
        pageInfo: {
          endCursor,
          currentInfo: { current, ...currentInfo },
        },
      } = products;

      if (newCurrent === current) return;

      if (
        newCurrent < current ||
        Math.ceil(edges.length / pageSize) - 1 > current
      ) {
        mutation({
          variables: {
            input: { pageId: 'products-selector', current: newCurrent },
          },
        });
        return;
      }

      fetchMore({
        variables: {
          cursor: endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) =>
          (fetchMoreResult?.viewer?.store?.adminProducts.edges || []).length ===
          0
            ? previousResult
            : {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  store: {
                    ...previousResult.viewer?.store,
                    __typename: 'Store',
                    adminProducts: {
                      __typename: 'AdminProductsConnection',
                      edges: [
                        ...(previousResult?.viewer?.store?.adminProducts
                          .edges || []),
                        ...(fetchMoreResult?.viewer?.store?.adminProducts
                          .edges || []),
                      ],
                      pageInfo: {
                        ...fetchMoreResult?.viewer?.store?.adminProducts
                          .pageInfo,
                        currentInfo: {
                          ...currentInfo,
                          __typename: 'CurrentInfo',
                          current: newCurrent,
                        },
                      },
                      total:
                        fetchMoreResult?.viewer?.store?.adminProducts.total,
                    },
                  },
                },
              },
      });
    },
    [products, fetchMore, mutation],
  );
};
