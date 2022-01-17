// typescript import
import { QueryResult } from '@apollo/client';

// import
import { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// graphql typescript
import {
  getAdminProducts as getAdminProductsType,
  getAdminProductsVariables as getAdminProductsVariablesType,
  getAdminProducts_viewer_store_adminProducts as getAdminProductsViewerStoreAdminProductsType,
  setProductsCurrent as setProductsCurrentType,
  setProductsCurrentVariables as setProductsCurrentVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getAdminProducts, setProductsCurrent } from '../gqls/useGetProducts';

// typescript definition
interface PropsType
  extends Pick<
    QueryResult<getAdminProductsType, getAdminProductsVariablesType>,
    'variables' | 'refetch'
  > {
  loading: boolean;
  products: getAdminProductsViewerStoreAdminProductsType | null;
  current: number;
  pageSize: number;
  changePage: (newCurrent: number, newPageSize: number) => void;
}

// definition
export default (): PropsType => {
  const [pageSize, setPageSize] = useState<number>(10);
  const { loading, data, variables, fetchMore, refetch } = useQuery<
    getAdminProductsType,
    getAdminProductsVariablesType
  >(getAdminProducts, {
    variables: {
      first: pageSize,
    },
  });

  const [setCurrent] = useMutation<
    setProductsCurrentType,
    setProductsCurrentVariablesType
  >(setProductsCurrent);

  const products = data?.viewer?.store?.adminProducts || null;
  const current = products?.pageInfo.currentInfo.current || 0;

  return {
    loading,
    products,
    variables,
    refetch,
    current,
    pageSize,
    changePage: useCallback(
      (newCurrent: number, newPageSize: number): void => {
        if (loading) return;

        if (newPageSize !== pageSize) {
          refetch({ first: newPageSize });
          setPageSize(newPageSize);
          return;
        }

        if (newCurrent === current || !products) return;

        if (
          newCurrent < current ||
          Math.ceil(products.edges.length / pageSize) - 1 > current
        ) {
          setCurrent({
            variables: {
              input: {
                pageId: 'products-designated-payments',
                current: newCurrent,
              },
            },
          });
          return;
        }

        fetchMore({
          variables: {
            after: products.pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult?.viewer?.store?.adminProducts)
              return previousResult;

            return {
              ...previousResult,
              viewer: {
                ...previousResult.viewer,
                store: {
                  ...previousResult.viewer?.store,
                  adminProducts: {
                    ...previousResult.viewer?.store?.adminProducts,
                    edges: [
                      ...(previousResult.viewer?.store?.adminProducts?.edges ||
                        []),
                      ...fetchMoreResult.viewer.store.adminProducts.edges,
                    ],
                    pageInfo: {
                      ...fetchMoreResult.viewer.store.adminProducts.pageInfo,
                      currentInfo: {
                        ...fetchMoreResult.viewer.store.adminProducts.pageInfo
                          .currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: fetchMoreResult.viewer.store.adminProducts.total,
                  },
                },
              },
            };
          },
        });
      },
      [loading, current, pageSize, products, fetchMore, refetch, setCurrent],
    ),
  };
};
