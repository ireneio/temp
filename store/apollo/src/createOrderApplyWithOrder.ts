// typescript import
import { ContextType } from '@meepshop/apollo';

// import
import gql from 'graphql-tag';

// graphql typescript
import { createOrderApplyWithOrderOrderApplyFragment as createOrderApplyWithOrderOrderApplyFragmentType } from './__generated__/createOrderApplyWithOrderOrderApplyFragment';
import { getOrderCache } from './__generated__/getOrderCache';
import { updateOrderApplyCache } from './__generated__/updateOrderApplyCache';

// graphql import
import { orderOrderFragment, orderOrderApplyFragment } from './Order';
import {
  productsObjectTypeProductsObjectTypeFragment,
  productsObjectTypeOrderApplyFragment,
} from './productsObjectType';

// definition
export const createOrderApplyWithOrderOrderClientFragment = gql`
  fragment createOrderApplyWithOrderOrderClientFragment on Order {
    id
    applications {
      id
      extra {
        id
        product {
          id
        }
      }
    }
    products {
      id
      unappliedQuantity
    }
    isAvailableForPayLater
    isAvailableForOrderApply
    isOrderApplied
    status
  }
`;

export const createOrderApplyWithOrderOrderFragment = gql`
  fragment createOrderApplyWithOrderOrderFragment on Order {
    id
    products {
      id
      ...productsObjectTypeProductsObjectTypeFragment
    }
    ...orderOrderFragment
  }

  ${productsObjectTypeProductsObjectTypeFragment}
  ${orderOrderFragment}
`;

export const createOrderApplyWithOrderOrderApplyFragment = gql`
  fragment createOrderApplyWithOrderOrderApplyFragment on OrderApply {
    id
    ...orderOrderApplyFragment
    ...productsObjectTypeOrderApplyFragment
  }

  ${orderOrderApplyFragment}
  ${productsObjectTypeOrderApplyFragment}
`;

const query = gql`
  query getOrderCache($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        ...createOrderApplyWithOrderOrderFragment
      }
    }

    getOrderApplyList(
      search: { sort: [{ field: "createdAt", order: "desc" }] }
    ) {
      data {
        ...createOrderApplyWithOrderOrderApplyFragment
      }
    }
  }

  ${createOrderApplyWithOrderOrderFragment}
  ${createOrderApplyWithOrderOrderApplyFragment}
`;

export const resolvers = {
  Mutation: {
    createOrderApplyWithOrder: (
      {
        createOrderApplyList,
      }: {
        createOrderApplyList: createOrderApplyWithOrderOrderApplyFragmentType[];
      },
      { orderId }: { orderId: string },
      { cache }: ContextType,
    ) => {
      const orderCache = cache.readQuery<getOrderCache>({
        query,
        variables: {
          orderId,
        },
      });
      const applications = orderCache?.getOrderApplyList?.data;
      const order = orderCache?.viewer?.order;
      const getOrderApplyList = {
        __typename: 'OrderApplyList' as 'OrderApplyList',
        data: [...(createOrderApplyList || []), ...(applications || [])],
      };

      cache.writeQuery<updateOrderApplyCache>({
        query: gql`
          query updateOrderApplyCache {
            getOrderApplyList(
              search: { sort: [{ field: "createdAt", order: "desc" }] }
            ) {
              data {
                ...createOrderApplyWithOrderOrderApplyFragment
              }
            }
          }

          ${createOrderApplyWithOrderOrderApplyFragment}
        `,
        data: {
          getOrderApplyList,
        },
      });

      return !order
        ? null
        : {
            ...order,
            status: 3,
            getOrderApplyList,
          };
    },
  },
};
