/* eslint-disable indent */
export default ({ coupon, points, paymentId, shipmentId, products }) => `
mutation {
  computeOrderList(computeOrderList: [{
    computeType: "cart"
    ${!coupon ? '' : `coupon: "${coupon}"`}
    ${!points ? '' : `points: ${points}`}
    products: [${products.map(
      ({ cartId, productId, variantId, quantity }) => `{
      productId: "${productId}"
      ${!cartId ? '' : `cartId: "${cartId}"`}
      ${!variantId ? '' : `variantId: "${variantId}"`}
      ${!quantity ? '' : `quantity: ${quantity}`}
    }`,
    )}]
    ${
      !paymentId
        ? ''
        : `
      payments: [{
        paymentId: "${paymentId}"
      }]
    `
    }
    ${
      !shipmentId
        ? ''
        : `
      shipments: [{
        shipmentId: "${shipmentId}"
      }]
    `
    }
  }]) {
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
        stock
        cartId
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
        maxPurchaseLimit
        minPurchaseItems
        quantity
        discountPrice
        galleryInfo {
          media
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
}`;
