import uuid from 'uuid';

import * as COUNTRY_LOCALE from 'locale/country';

export default ({
  domain,
  locale,
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
  invoiceEInvoiceNumber,
  invoiceDonate,

  isRememberCard,
  cardHolderName,
  cardNumber,
  securityCode,
  expire,
  installmentCode,

  // redirectUrl
  redirectUrl = null,

  // not in form data
  isPayment = true,
  products,
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
          Language
          strRqXML
          URLEnc
          merID
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
        locale,
        ...(!sourcePage ? {} : { sourcePage }),
      },
      idempotentKey: uuid.v4(),
      isPayment,
      products: products
        .filter(({ type }) => type !== 'gift')
        .map(({ productId, variantId, quantity = 1 }) => ({
          productId,
          variantId,
          quantity,
        })),
      ...(!coupon ? {} : { coupon }),
      ...(!points ? {} : { points }),
      payments: [
        {
          paymentId,
          redirectUrl,
          ...(choosePayment.template !== 'gmo' ||
          choosePayment.accountInfo.gmo.paymentType !== 'Credit'
            ? {}
            : {
                gmo: {
                  isRememberCard,
                  cardHolderName,
                  cardNumber: !cardNumber ? undefined : cardNumber.join(''),
                  securityCode,
                  ...(!expire
                    ? {}
                    : {
                        expireYear: expire.year(),
                        expireMonth: expire.month() + 1,
                      }),
                  ...(!installmentCode
                    ? {}
                    : {
                        installmentCode:
                          installmentCode instanceof Array
                            ? installmentCode[installmentCode.length - 1]
                            : installmentCode,
                      }),
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
                    postalCode: postalCode?.toString(),
                    streetAddress: `${postalCode} ${address[0]} ${address[1] ||
                      ''}${address[2] || ''}${addressDetail}`,
                    yahooCode: {
                      country: Object.values(COUNTRY_LOCALE).find(
                        countyLocale =>
                          Object.values(countyLocale).includes(address[0]),
                      ).en_US,
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
            invoice: {
              type: invoice[0],
              ...(invoice[1] === 'MEMBERSHIP' ||
              invoice[1] === 'MOBILE_BARCODE' ||
              invoice[1] === 'CITIZEN_DIGITAL_CERTIFICATE'
                ? {
                    method: 'CARRIER',
                    carrier: {
                      type: invoice[1],
                      ...(!invoiceEInvoiceNumber
                        ? {}
                        : { code: invoiceEInvoiceNumber }),
                    },
                  }
                : {
                    method: invoice[1],
                  }),
              // method = TRIPLICATE
              ...(!invoiceAddress ? {} : { address: invoiceAddress }),
              ...(!invoiceTitle ? {} : { title: invoiceTitle }),
              ...(!invoiceVAT ? {} : { ban: invoiceVAT }),
              // method = DONATION
              ...(!invoiceDonate ? {} : { loveCode: invoiceDonate }),
            },
          }),
    },
  },
];
