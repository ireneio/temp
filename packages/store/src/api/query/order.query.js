const productsQuery = `{
  id
  type
  productId
  variantId
  quantity
  discountId
  title {
    zh_TW
    en_US
  }
  specs {
    title {
      zh_TW
    }
  }
  sku
  vendorSku
  warehouseNumber
  listPrice
  retailPrice
  cost
  stock
  quantity
  weight {
    weight
    unit
  }
  size {
    width
    height
    depth
    unit
  }
  galleryInfo {
    media
    mainId
  }
  orderStatus
  shippedCount
  _error
}`;

const recipientQuery = `{
  name
  mobile
  tel
  comment
  email
  receiverStoreID
  receiverStoreName
  receiverStoreAddress
  address {
    streetAddress
  }
}`;

const paymentsQuery = `{
  paymentId
  template
  name
  price
  description
}`;

const shipmenstQuery = `{
  shipmentId
  template
  name
  description
  priceRule {
    method
    fix
  }
}`;

const orderQuery = `{
  id
  orderNo
  status
  messages {
    text
    bearer
    createdAt
  }
  userInfo {
    name
    email
    mobile
    tel
  }
  categories {
    id
    tag
    products ${productsQuery}
    payments ${paymentsQuery}
    shipments ${shipmenstQuery}
  }
  shipmentInfo {
    list {
      name
      number
      description
      shipmentId
      recipient ${recipientQuery}
      storeShipmentDetails {
        id
        searchLink
      }
    }
    status
  }
  paymentInfo {
    list {
      id
      paymentId
      name
      template
      description
      accountInfo {
        allpay {
          ChoosePayment
        }
        gmo {
          paymentType
          contractCode
        }
        ezpay {
          merchantNumber
          ezpayPaymentType
        }
      }
      memo {
        allpay {
          BankCode
          vAccount
          ExpireDate
          PaymentNo
          Barcode1
          Barcode2
          Barcode3
        }
        ezpay {
          storeName
          merchantNumber
          orderNumber
          amount
          paycode
          paymentType
          error
          expireDate
        }
      }
    }
    status
  }
  environment {
    userAgent {
      browserName
      browserVersion
      os
      deviceModel
      deviceType
    }
    domain
    locale
    currency
    exchangeRate
    sourcePage
  }
  activityInfo {
    plugin
    discountPrice
    id
    title {
      zh_TW
      en_US
    }
  }
  priceInfo {
    currency
    discount
    orderDiscount
    productDiscount
    productPrice
    paymentFee
    shipmentFee
    total
    cost
  }
  invoiceInfo{
    invoiceType
    invoiceTitle
    invoiceVAT
    donateUnit
    streetAddress
    vehicleType
    citizenDigitalCertificate
    mobileBarcode
  }
  note
  paidMessage {
    note
  }
  createdOn
}`;

export default orderQuery;
