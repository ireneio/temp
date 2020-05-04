const cartQuery = `
  priceInfo {
    currency
    discount
    orderDiscount
    productDiscount
    shipmentFee
    productPrice
    total
  }
  categories {
    products {
      id
      cartId
      productId
      variantId
      quantity
      discountPrice
      activityInfo {
        id
        title {
          zh_TW
          en_US
        }
        discountPrice
      }
      stock
      sku
      minPurchaseItems
      maxPurchaseLimit
      retailPrice
      listPrice
      totalPrice
      specs {
        id
        title {
          zh_TW
          en_US
        }
      }
      title {
        zh_TW
        en_US
      }
      coverImage{
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
      type
      error: _error
    }
    shipmentTemplates {
      shipmentId
      name
      description
      template
      price
    }
    paymentTemplates {
      paymentId
      name
      description
      template
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
`;

export default cartQuery;
