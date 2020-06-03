// import
import gql from 'graphql-tag';

import { PAYMENT_CAN_PAID_LATER } from '../constants';

// graphql typescript
import {
  calculateOrderOrderFragment as calculateOrderOrderFragmentType,
  calculateOrderOrderFragment_products as calculateOrderOrderFragmentProducts,
} from './__generated__/calculateOrderOrderFragment';
import {
  calculateOrderOrderApplyListFragment as calculateOrderOrderApplyListFragmentType,
  calculateOrderOrderApplyListFragment_data as calculateOrderOrderApplyListFragmentData,
} from './__generated__/calculateOrderOrderApplyListFragment';

// typescript definition
interface OrderApplyPropsType {
  isAvailableForOrderApply: boolean;
  isOrderApplied: boolean;
}

interface OrderPayLaterPropsType {
  isAvailableForPayLater: boolean;
}

interface ApplicationData extends calculateOrderOrderApplyListFragmentData {
  product: calculateOrderOrderFragmentProducts | null;
}

interface Application extends calculateOrderOrderApplyListFragmentData {
  extra: ApplicationData[];
}

// definition
export const calculateOrderOrderFragment = gql`
  fragment calculateOrderOrderFragment on Order {
    id
    paymentInfo {
      list {
        id
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

export const calculateOrderOrderApplyListFragment = gql`
  fragment calculateOrderOrderApplyListFragment on OrderApplyList {
    data {
      id
      orderId
      orderProductId
      returnId
      applicationType
      createdOn
      recipient {
        name
        mobile
        address {
          streetAddress
        }
      }
      applicationInfo {
        comment
      }
      quantity
      status
      applicationStatus
    }
  }
`;

export const calculateOrderApply = (
  order: calculateOrderOrderFragmentType,
  getOrderApplyList: calculateOrderOrderApplyListFragmentType,
): OrderApplyPropsType | null => {
  // insufficient data
  if (!getOrderApplyList.data || !order.id) return null;

  // 判斷是否已有申請退換貨
  const orderApply = getOrderApplyList.data.filter(
    application => application && application.orderId === order.id,
  ) as calculateOrderOrderApplyListFragmentData[];

  // insufficient data
  if (!order.products) return null;

  // 判斷是否有商品可以退換貨
  const isAvailableForOrderApply = order.products.reduce((result, product) => {
    const { id: productId = null, quantity = 0, type = 'gift' } =
      product || {}; /** TODO: should not be null */

    if (type === 'gift') return result;

    const orderApplyProducts = orderApply.find(
      application => application.orderProductId === productId,
    );

    if (
      orderApplyProducts &&
      [0, 3].includes(
        orderApplyProducts.status || 0 /** TODO: should not be null */,
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
  }, false);

  return {
    isAvailableForOrderApply,
    isOrderApplied: orderApply.length !== 0,
  };
};

export const calculateOrderPayLater = (
  order: calculateOrderOrderFragmentType,
): OrderPayLaterPropsType | null => {
  const { template = null, accountInfo = null } =
    order?.paymentInfo?.list?.[0] || {};

  if (!template) return null;

  const { choosePayment = null } =
    template === 'allpay' || template === 'ezpay' || template === 'gmo'
      ? accountInfo?.[template] || {}
      : {};

  const isAvailableForPayLater = (() => {
    if (choosePayment) {
      if (template === 'allpay')
        return PAYMENT_CAN_PAID_LATER[template][
          choosePayment as 'Credit' | 'WebATM' | 'ATM' | 'CVS' | 'BARCODE'
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
    isAvailableForPayLater: Boolean(isAvailableForPayLater),
  };
};

export const calculateOrderApplications = (
  order: calculateOrderOrderFragmentType,
  getOrderApplyList: calculateOrderOrderApplyListFragmentType,
): Application[] =>
  (getOrderApplyList.data || []).reduce((applications, application) => {
    if (
      !application ||
      application?.orderId !== order.id
      /** TODO: should not be null */
    )
      return applications;

    const existedApp = applications.find(
      app => app.returnId === application.returnId,
    );

    if (!existedApp)
      return [
        ...applications,
        {
          ...application,
          extra: [
            {
              ...application,
              product:
                order.products.find(
                  product =>
                    /** TODO: should not be null */
                    application?.orderProductId ===
                    (product || { id: null }).id,
                ) || null,
            },
          ],
        },
      ];

    existedApp.extra = [
      ...existedApp.extra,
      {
        ...application,
        product:
          order.products.find(
            product =>
              /** TODO: should not be null */
              application?.orderProductId === (product || { id: null }).id,
          ) || null,
      },
    ];
    return applications;
  }, [] as Application[]);

export const calculateOrderProducts = (
  order: calculateOrderOrderFragmentType,
  getOrderApplyList: calculateOrderOrderApplyListFragmentType,
): calculateOrderOrderFragmentType['products'] =>
  order.products.map(product => {
    if (!product) return product;

    const application = (getOrderApplyList.data || []).find(
      app => app && app.orderProductId === product.id,
    );

    if (!application)
      return {
        ...product,
        unappliedQuantity: product.quantity || 0,
      };

    if (application && [0, 3].includes(application.status || 0))
      return {
        ...product,
        unappliedQuantity: 0,
      };

    return {
      ...product,
      unappliedQuantity: (product.quantity || 0) - (application.quantity || 0),
    };
  });
