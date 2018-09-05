import uuid from 'uuid';
import moment from 'moment';

export default ({
  domain,
  sourcePage,

  userEmail,
  userPassword,
  userName,
  userMobile,

  paymentId,
  shipmentId,
  coupon,
  points, // for checkout

  name,
  isSaveAsReceiverTemplate = false,
  idNumber,
  mobile,
  postalCode,
  address,
  addressDetail,
  notes,
  CVSStoreID,
  CVSStoreName,
  CVSAddress,

  invoice,
  invoiceTitle,
  invoiceVAT,
  invoiceAddress,
  invoiceEInvoice,
  invoiceEInvoiceNumber,
  invoiceDonate,

  creditCardOwnerName,
  creditCardSecurityCode,
  creditCardNumber,
  creditCardExpiration,
  creditCardInstallment,

  // not in form data
  isPayment = true,
  products,
  creditCardIsRegistered,
  choosePayment,
}) => [
  `
  mutation createOrderList($createOrderList: [NewOrder]){
    createOrderList(createOrderList: $createOrderList) {
      id
      orderNo
      error: _error
      formData {
        params {
          MerchantID
          MerchantTradeNo
          MerchantTradeDate
          PaymentType
          TotalAmount
          TradeDesc
          ItemName
          ReturnURL
          ChoosePayment
          CheckMacValue
          PaymentInfoURL
          OrderResultURL
          ClientRedirectURL
          ExpireDate
          CreditInstallment
          Redeem
          UnionPay
          ClientBackURL
          AlipayItemName
          AlipayItemCounts
          AlipayItemPrice
          Email
          PhoneNo
          UserName
          IgnorePayment
          DeviceSource
          NeedExtraPaidInfo
          HashKey
          HashIV
          Type
          storeid
          ordernumber
          amount
          orderdesc
          depositflag
          queryflag
          e03
          returnURL
          merUpdateURL
          payment_code
          trans_code
          mode
          MerchantNumber
          OrderNumber
          Amount
          ApproveFlag
          DepositFlag
          Englishmode
          iphonepage
          OrderURL
          op
          checksum
          merchantnumber
          paymenttype
          paytitle
          paymemo
          returnvalue
          nexturl
          hash
          bankid
        }
        url
        type
      }
    }
  }
`,
  {
    createOrderList: {
      environment: {
        domain,
        ...(!sourcePage ? {} : { sourcePage }),
      },
      idempotentKey: uuid.v4(),
      isPayment,
      products: products
        .filter(({ type }) => type !== 'gift')
        .map(({ productId, variantId, quantity }) => ({
          productId,
          variantId,
          ...(!quantity ? {} : { quantity }),
        })),
      ...(!coupon ? {} : { coupon }),
      ...(!points ? {} : { points }),
      payments: [
        {
          paymentId,
          ...(choosePayment.template !== 'gmo'
            ? {}
            : {
                gmo: {
                  isRegistered: creditCardIsRegistered,
                  changeCardNumber: Boolean(
                    creditCardIsRegistered &&
                      creditCardOwnerName &&
                      creditCardNumber &&
                      creditCardSecurityCode &&
                      creditCardExpiration,
                  ),
                  ...(!creditCardOwnerName
                    ? {}
                    : { cardHolderName: creditCardOwnerName }),
                  ...(!creditCardNumber
                    ? {}
                    : { cardNumber: creditCardNumber.join('') }),
                  ...(!creditCardSecurityCode
                    ? {}
                    : { securityCode: creditCardSecurityCode }),
                  ...(!creditCardExpiration
                    ? {}
                    : moment(creditCardExpiration)
                        .toArray()
                        .slice(0, 2)
                        .reduce(
                          (result, val, index) =>
                            index === 0
                              ? { ...result, expireYear: val.toString() }
                              : {
                                  ...result,
                                  expireMonth: (val + 1).toString(),
                                },
                          {},
                        )),
                  ...(!creditCardInstallment
                    ? {}
                    : { installmentCode: creditCardInstallment.join('-') }),
                },
              }),
        },
      ],
      shipments: [
        {
          shipmentId,
          recipient: {
            name,
            saveRecipient: isSaveAsReceiverTemplate,
            ...(!userEmail ? {} : { email: userEmail }),
            ...(!mobile ? {} : { mobile }),
            ...(!notes ? {} : { comment: notes }),
            ...(!idNumber ? {} : { idNumber }),
            ...(!CVSStoreID
              ? {}
              : {
                  receiverStoreID: CVSStoreID,
                  receiverStoreName: CVSStoreName,
                  receiverStoreAddress: CVSAddress,
                }),
            ...(!address
              ? {}
              : {
                  address: {
                    postalCode: postalCode.toString(),
                    streetAddress: `${postalCode} ${address[0]} ${address[1] ||
                      ''}${address[2] || ''}${addressDetail}`,
                    yahooCode: {
                      country: address[0],
                      city: address[1] || '',
                      county: address[2] || '',
                      street: addressDetail,
                    },
                  },
                }),
          },
        },
      ],
      userInfo: {
        name: userName || name,
        ...(!userEmail ? {} : { email: userEmail }),
        ...(!userMobile || !mobile ? {} : { mobile: userMobile || mobile }),
        ...(!userPassword ? {} : { password: userPassword }),
      },
      ...(!invoice
        ? {}
        : {
            invoiceInfo: {
              invoiceType: invoice,
              // invoiceType = 2
              ...(!invoiceAddress ? {} : { streetAddress: invoiceAddress }),
              ...(!invoiceTitle ? {} : { invoiceTitle }),
              ...(!invoiceVAT ? {} : { invoiceVAT }),
              // invoiceType = 3
              ...(!invoiceEInvoice ? {} : { vehicleType: invoiceEInvoice }),
              ...(!invoiceEInvoiceNumber || invoiceEInvoice !== 2
                ? {}
                : { mobileBarcode: invoiceEInvoiceNumber }),
              ...(!invoiceEInvoiceNumber || invoiceEInvoice !== 3
                ? {}
                : { citizenDigitalCertificate: invoiceEInvoiceNumber }),
              // invoiceType = 4
              ...(!invoiceDonate ? {} : { donateUnit: invoiceDonate }),
            },
          }),
    },
  },
];
