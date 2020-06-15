const computeOrderQuery = `
  priceInfo {
    currency
    discount
    orderDiscount
    productDiscount
    shipmentFee
    paymentFee
    productPrice
    productPriceTotal
    total
    userPoints
    canUsePointsLimit
  }
  points
  coupon
  categories {
    products {
      id
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
      listPrice
      totalPrice
      error: _error
    }
    paymentTemplates {
      paymentId
      template
      name
      description
      paymentLater
      accountInfo {
        allpay {
          ChoosePayment
        }
        gmo {
          isInstallment
        }
      }
    }
    shipmentTemplates {
      shipmentId
      name
      description
      shipmentId
      template
      name
      price
    }
  }
  activityInfo {
    id
    title {
      zh_TW
      en_US
    }
    discountPrice
    plugin
    startTime
    endTime
    unlimitedDate
    rule {
      discount {
        method
        value
      }
    }
    couponSetting {
      useTimesType
      useTimes
      couponUseTimes
    }
  }
  errorObj {
    code
    params {
      name
      value
    }
  }
  _error
`;

export default computeOrderQuery;
