// graphql typescript
import {
  orderOrderFragment as orderOrderFragmentType,
  orderOrderFragment_products as orderOrderFragmentProducts,
  orderOrderApplyFragment as orderOrderApplyFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface DefaultDataType {
  getOrderApplyList?: {
    data: (orderOrderApplyFragmentType | null)[] | null;
  };
}

interface ApplicationProductType
  extends Omit<orderOrderFragmentProducts, '__typename'> {
  __typename: 'OrderApplyProduct';
}

interface ApplicationType extends orderOrderApplyFragmentType {
  extra: (orderOrderApplyFragmentType & {
    product: ApplicationProductType | null;
  })[];
}

// definition
const PAYMENT_CAN_PAID_LATER = {
  allpay: {
    Credit: true,
    WebATM: true,
    ATM: false,
    CVS: false,
    BARCODE: false,
  },
  ezpay: {
    Credit: false,
    CS: false,
    ATM: false,
    WEBATM: false,
    MMK: false,
  },
  hitrust: true,
  gmo: false,
  custom: false,
};

export const resolvers = {
  Order: {
    applications: ({
      id,
      products,
      getOrderApplyList,
    }: DefaultDataType & orderOrderFragmentType) =>
      (getOrderApplyList?.data || []).reduce((result, getOrderApply) => {
        if (!getOrderApply || getOrderApply?.orderId !== id) return result;

        const application = result.find(
          ({ returnId }) => returnId === getOrderApply.returnId,
        );
        const product = products.find(
          eachProduct =>
            /** SHOULD_NOT_BE_NULL */
            getOrderApply?.orderProductId === (eachProduct?.id || null),
        );

        if (!application)
          return [
            ...result,
            {
              ...getOrderApply,
              extra: [
                {
                  ...getOrderApply,
                  product: !product
                    ? null
                    : {
                        ...product,
                        __typename: 'OrderApplyProduct',
                        id: `OrderApplyProduct:${product.id}`,
                      },
                },
              ],
            },
          ];

        application.extra = [
          ...application.extra,
          {
            ...getOrderApply,
            product: !product
              ? null
              : {
                  ...product,
                  __typename: 'OrderApplyProduct',
                  id: `OrderApplyProduct:${product.id}`,
                },
          },
        ];

        return result;
      }, [] as ApplicationType[]),
    isAvailableForPayLater: ({ paymentInfo }: orderOrderFragmentType) => {
      const { template, accountInfo } = paymentInfo?.list?.[0] || {};
      const { choosePayment = null } =
        template === 'allpay' || template === 'ezpay' || template === 'gmo'
          ? accountInfo?.[template] || {}
          : {};

      if (choosePayment) {
        if (template === 'allpay')
          return (
            PAYMENT_CAN_PAID_LATER[template][
              choosePayment as 'Credit' | 'WebATM' | 'ATM' | 'CVS' | 'BARCODE'
            ] || false
          );

        if (template === 'ezpay')
          return (
            PAYMENT_CAN_PAID_LATER[template][
              choosePayment as 'Credit' | 'CS' | 'ATM' | 'WEBATM' | 'MMK'
            ] || false
          );
      }

      return (
        PAYMENT_CAN_PAID_LATER[
          template as keyof typeof PAYMENT_CAN_PAID_LATER
        ] || false
      );
    },
    isAvailableForOrderApply: ({
      id,
      products,
      getOrderApplyList,
    }: DefaultDataType & orderOrderFragmentType) => {
      const orderApply = getOrderApplyList?.data?.filter(
        getOrderApply => getOrderApply?.orderId === id,
      );

      return products.reduce((result, product) => {
        const { id: productId = null, quantity = 0, type = 'gift' } =
          product || {}; /** SHOULD_NOT_BE_NULL */

        if (type === 'gift') return result;

        const orderApplyProduct = orderApply?.find(
          eachOrderApply => eachOrderApply?.orderProductId === productId,
        );

        if (
          orderApplyProduct &&
          [0, 3].includes(
            orderApplyProduct.status || 0 /** SHOULD_NOT_BE_NULL */,
          )
        )
          return result;

        return (
          result ||
          (quantity || 0) -
            (orderApplyProduct?.quantity || 0) /** SHOULD_NOT_BE_NULL */ >
            0
        );
      }, false);
    },
    isOrderApplied: ({
      id,
      getOrderApplyList,
    }: DefaultDataType & orderOrderFragmentType) =>
      (
        getOrderApplyList?.data?.filter(
          getOrderApply => getOrderApply?.orderId === id,
        ) || []
      ).length !== 0,
  },
  OrderEdge: {
    node: ({ node, getOrderApplyList }: DefaultDataType & { node?: {} }) =>
      !node
        ? null
        : {
            ...node,
            getOrderApplyList,
          },
  },
  OrderConnection: {
    edges: ({ edges, getOrderApplyList }: DefaultDataType & { edges?: [{}] }) =>
      edges?.map(edge =>
        !edge
          ? null
          : {
              ...edge,
              getOrderApplyList,
            },
      ),
  },
  User: {
    order: ({ order, getOrderApplyList }: DefaultDataType & { order?: {} }) =>
      !order
        ? null
        : {
            ...order,
            getOrderApplyList,
          },
    orders: ({
      orders,
      getOrderApplyList,
    }: DefaultDataType & { orders?: {} }) =>
      !orders
        ? null
        : {
            ...orders,
            getOrderApplyList,
          },
  },
  Query: {
    viewer: ({
      viewer,
      getOrderApplyList,
    }: DefaultDataType & { viewer?: {} }) =>
      !viewer
        ? null
        : {
            ...viewer,
            getOrderApplyList,
          },
  },
};
