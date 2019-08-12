// import
import {
  calculateOrderApply,
  calculateOrderPayLater,
  calculateOrderApplications,
  calculateOrderProducts,
} from './utils/calculateOrder';

// graphql typescript
import { calculateOrderOrderFragment as calculateOrderOrderFragmentType } from './utils/__generated__/calculateOrderOrderFragment';
import { calculateOrderOrderApplyListFragment as calculateOrderOrderApplyListFragmentType } from './utils/__generated__/calculateOrderOrderApplyListFragment';

// definition
export const resolver = {
  Query: {
    viewer: ({
      viewer,
      getOrderApplyList,
    }: {
      viewer: {
        orders: {
          edges: {
            node: calculateOrderOrderFragmentType;
          }[];
        } | null;
        order: calculateOrderOrderFragmentType;
      } | null;
      getOrderApplyList: calculateOrderOrderApplyListFragmentType | null;
    }) => {
      if (!viewer || !getOrderApplyList) return viewer;

      // TODO: should be added in the server schema
      return {
        ...viewer,
        orders: !viewer.orders
          ? null
          : {
              ...viewer.orders,
              edges: viewer.orders.edges.map(({ node, ...edge }) => ({
                ...edge,
                node: {
                  ...node,
                  ...calculateOrderPayLater(node),
                  ...calculateOrderApply(node, getOrderApplyList),
                },
              })),
            },
        order: !viewer.order
          ? null
          : {
              ...viewer.order,
              ...(!viewer.order.products
                ? null
                : {
                    products: calculateOrderProducts(
                      viewer.order,
                      getOrderApplyList,
                    ),
                  }),
              applications: calculateOrderApplications(
                viewer.order,
                getOrderApplyList,
              ),
              ...calculateOrderPayLater(viewer.order),
              ...calculateOrderApply(viewer.order, getOrderApplyList),
            },
      };
    },
  },
};
