// import
import { gql } from 'apollo-boost';
import idx from 'idx';

import { PAYMENT_CAN_PAID_LATER } from './constants';

// graphql typescript
import { orderFragment as orderFragmentType } from './__generated__/orderFragment';
import { orderApplyFragment as orderApplyFragmentType } from './__generated__/orderApplyFragment';

// definition
export const orderFragment = gql`
  fragment orderFragment on Order {
    id
    paymentInfo {
      list {
        template
        accountInfo {
          allpay {
            choosePayment: ChoosePayment
          }
          ezpay {
            choosePayment: ezpayPaymentType
          }
          gmo {
            choosePayment: paymentType
          }
        }
      }
    }

    products {
      id
      quantity
      type
    }

    isAvailableForPayLater @client
    isAvailableForOrderApply @client
  }
`;

export const orderApplyFragment = gql`
  fragment orderApplyFragment on OrderApplyList {
    data {
      orderId
      orderProductId
      status
      quantity
    }
  }
`;

export const resolver = {
  Query: {
    viewer: ({
      viewer,
      getOrderApplyList,
    }: {
      viewer: {
        orders: {
          edges: {
            node: orderFragmentType;
          }[];
        } | null;
      } | null;
      getOrderApplyList: orderApplyFragmentType | null;
    }) => {
      if (!viewer || !viewer.orders || !getOrderApplyList) return viewer;

      // TODO: should be added in the server schema
      return {
        ...viewer,
        orders: {
          ...viewer.orders,
          edges: viewer.orders.edges.map(({ node, ...edge }) => {
            const { template = null, accountInfo = null } =
              idx(node, _ => _.paymentInfo.list[0]) || {};

            if (!template || !accountInfo || !getOrderApplyList)
              return {
                ...edge,
                node,
              };

            const { choosePayment = null } =
              template === 'allpay' ||
              template === 'ezpay' ||
              template === 'gmo'
                ? idx(accountInfo, _ => _[template]) || {}
                : {};

            // 判斷是否已有申請退換貨
            const orderApply = (getOrderApplyList.data || []).filter(
              orderApplyElement =>
                idx(orderApplyElement, _ => _.orderId) ===
                node.id /** TODO: should not be null */,
            );

            // 判斷是否有商品可以退換貨
            const isAvailableForOrderApply = node.products.reduce(
              (result, product) => {
                const { id: productId = null, quantity = 0, type = 'gift' } =
                  product || {}; /** TODO: should not be null */

                if (type === 'gift') return result;

                const orderApplyProducts = orderApply.find(
                  orderApplyElement =>
                    idx(orderApplyElement, _ => _.orderProductId) ===
                    productId /** TODO: should not be null */,
                );

                if (
                  orderApplyProducts &&
                  [0, 3].includes(
                    orderApplyProducts.status ||
                      0 /** TODO: should not be null */,
                  )
                )
                  return result;

                return (
                  result ||
                  (quantity || 0) -
                    ((orderApplyProducts || { quantity: 0 }).quantity ||
                      0) /** TODO: should not be null */ >
                    0
                );
              },
              false,
            );
            const isAvailableForPayLater = (() => {
              if (choosePayment) {
                if (template === 'allpay')
                  return PAYMENT_CAN_PAID_LATER[template][
                    choosePayment as
                      | 'Credit'
                      | 'WebATM'
                      | 'ATM'
                      | 'CVS'
                      | 'BARCODE'
                  ];

                if (template === 'ezpay')
                  return PAYMENT_CAN_PAID_LATER[template][
                    choosePayment as 'Credit' | 'CS' | 'ATM' | 'WEBATM' | 'MMK'
                  ];
              }

              return PAYMENT_CAN_PAID_LATER[
                template as keyof typeof PAYMENT_CAN_PAID_LATER
              ];
            })();

            return {
              ...edge,
              node: {
                ...node,
                isAvailableForPayLater: Boolean(isAvailableForPayLater),
                isAvailableForOrderApply,
                isOrderApplied: orderApply.length !== 0,
              },
            };
          }),
        },
      };
    },
  },
};
