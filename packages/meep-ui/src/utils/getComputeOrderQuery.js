import { gql } from '@apollo/client';

export const computeOrderList = gql`
  mutation computeOrderList($computeOrderList: [NewOrder]) {
    computeOrderList(computeOrderList: $computeOrderList) {
      activityInfo {
        id
        discountPrice
        title {
          zh_TW
          en_US
        }
        plugin
        rule {
          discount {
            method
            value
          }
        }
        startTime
        endTime
        couponSetting {
          useTimesType
          couponUseTimes
          useTimes
        }
        unlimitedDate
      }
      priceInfo {
        currency
        shipmentFee
        paymentFee
        productPrice
        userPoints
        canUsePointsLimit
        total
      }
      categories {
        paymentList: paymentTemplates {
          name
          paymentId
          template
          description
          accountInfo {
            gmo {
              isInstallment
              paymentType
              rememberCardNumber
            }
            allpay {
              ChoosePayment
            }
          }
          paymentLater
        }
        shipmentList: shipmentTemplates {
          name
          shipmentId
          template
          description
        }
        products {
          sku
          type
          title {
            zh_TW
            en_US
          }
          specs {
            id
            title {
              zh_TW
              en_US
            }
          }
          productId
          variantId
          variant {
            id
            currentMinPurchasableQty
            currentMaxPurchasableQty
          }
          quantity
          coverImage {
            scaledSrc {
              w60
              w120
              w240
              w480
              w720
              w960
              w1200
              w1440
              w1680
              w1920
            }
          }
          activityInfo {
            id
            title {
              zh_TW
              en_US
            }
            discountPrice
          }
          retailPrice
          totalPrice
          error: _error
        }
      }
      errorObj {
        code
        params {
          name
          value
        }
      }
    }
  }
`;

export const getVariables = ({
  coupon,
  points,
  paymentId,
  shipmentId,
  products,
}) => ({
  variables: {
    computeOrderList: {
      computeType: 'cart',
      ...(!coupon ? {} : { coupon }),
      ...(!points ? {} : { points }),
      products: products.map(({ productId, variantId, quantity }) => ({
        productId,
        ...(!variantId ? {} : { variantId }),
        ...(!quantity ? {} : { quantity }),
      })),
      ...(!paymentId ? {} : { payments: [{ paymentId }] }),
      ...(!shipmentId ? {} : { shipments: [{ shipmentId }] }),
    },
  },
});
