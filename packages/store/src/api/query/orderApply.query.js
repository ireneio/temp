const orderApplyQuery = `
  id
  orderId
  orderProductId
  productId
  variantId
  returnId
  orderNo
  quantity
  storeNotes
  recipient {
    name
    mobile
    tel
    comment
    address {
      streetAddress
    }
  }
  priceInfo {
    currency
    discount
    orderDiscount
    productDiscount
    shipmentDiscount
    shipmentFee
    return
    total
    actualTotal
    cost
    adjust
    productPrice
    productQuantity
    userPoints
    productPriceTotal
    freight
  }
  status
  applicationType
  applicationInfo {
    comment
    getProducts
    getInvoice
  }
  applicationStatus
  changeStock
  changeTotal
  createdOn
  createdBy
  updatedOn
  updatedBy
`;

export default orderApplyQuery;
