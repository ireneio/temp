import uuid from 'uuid';

/* eslint-disable indent */
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
  // TODO not used gender,
  // TODO not used birthday,
  idNumber,
  mobile,
  address,
  addressDetail,
  notes,
  CVSStoreID,
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
}) => `
  mutation {
    createOrderList(createOrderList: [{
      environment: {
        domain: "${domain}"
        ${!sourcePage ? '' : `sourcePage: ${sourcePage}`}
        userAgent: {
          # FIXME
          deviceType: ""
        }
      }
      idempotentKey: "${uuid.v4()}"
      isPayment: ${isPayment}
      products: [
        ${products
          .filter(({ type }) => type !== 'gift')
          .map(
            ({ productId, variantId, quantity }) => `{
          productId: "${productId}"
          variantId: "${variantId}"
          ${!quantity ? '' : `quantity: ${quantity}`}
        }`,
          )
          .join(' ')}
      ]
      ${!coupon ? '' : `coupon: "${coupon}"`}
      ${!points ? '' : `points: ${points}`}
      payments: [{
        paymentId: "${paymentId}"
        ${
          choosePayment.template !== 'gmo'
            ? ''
            : `
          gmo: {
            isRegistered: ${creditCardIsRegistered}
            changeCardNumber: ${Boolean(
              creditCardIsRegistered &&
                creditCardOwnerName &&
                creditCardNumber &&
                creditCardSecurityCode &&
                creditCardExpiration &&
                creditCardInstallment,
            )}
            ${
              !creditCardOwnerName
                ? ''
                : `cardHolderName: "${creditCardOwnerName}"`
            }
            ${!creditCardNumber ? '' : `cardNumber: "${creditCardNumber}"`}
            ${
              !creditCardSecurityCode
                ? ''
                : `securityCode: "${creditCardSecurityCode}"`
            }
            ${
              !creditCardExpiration
                ? ''
                : creditCardExpiration
                    .format('YYYY-MM')
                    .split(/-/)
                    .map(
                      (text, index) =>
                        `${['expireYear', 'expireMonth'][index]}: "${text}"`,
                    )
                    .join(' ')
            }
            ${
              !creditCardInstallment
                ? ''
                : `installmentCode: "${creditCardInstallment.join('-')}"`
            }
          }
        `
        }
      }]
      shipments: [{
        shipmentId: "${shipmentId}"
        recipient: {
          name: "${name}"
          saveRecipient: ${isSaveAsReceiverTemplate}
          ${!userEmail ? '' : `email: "${userEmail}"`}
          ${!mobile ? '' : `mobile: "${mobile}"`}
          ${!notes ? '' : `comment: "${notes}"`}
          ${!idNumber ? '' : `idNumber: "${idNumber}"`}
          ${!CVSStoreID ? '' : `receiverStoreID: "${CVSStoreID}"`}
          ${
            !CVSAddress
              ? ''
              : `
            address: {
              streetAddress: "${CVSAddress}"
            }
          `
          }
          ${
            !address
              ? ''
              : `
            address: {
              streetAddress: "${address.join(' / ')} ${addressDetail}"
              yahooCode: {
                country: "${address[0]}"
                city: "${address[1] || ''}"
                county: "${address[2] || ''}"
                street: "${addressDetail}"
              }
            }
          `
          }
        }
      }]
      userInfo: {
        name: "${userName || name}"
        ${!userEmail ? '' : `email: "${userEmail}"`}
        ${!userMobile || !mobile ? '' : `mobile: "${userMobile || mobile}"`}
        ${!userPassword ? '' : `password: "${userPassword}"`}
      }
      ${
        !invoice
          ? ''
          : `invoiceInfo: {
        invoiceType: ${invoice}
        # invoiceType = 2
        ${!invoiceAddress ? '' : `streetAddress: "${invoiceAddress}"`}
        ${!invoiceTitle ? '' : `invoiceTitle: "${invoiceTitle}"`}
        ${!invoiceVAT ? '' : `invoiceVAT: "${invoiceVAT}"`}
        # invoiceType = 3
        ${!invoiceEInvoice ? '' : `vehicleType: ${invoiceEInvoice}`}
        ${
          !invoiceEInvoiceNumber || invoiceEInvoice !== 2
            ? ''
            : `mobileBarcode: "${invoiceEInvoiceNumber}"`
        }
        ${
          !invoiceEInvoiceNumber || invoiceEInvoice !== 3
            ? ''
            : `citizenDigitalCertificate: "${invoiceEInvoiceNumber}"`
        }
        # invoiceType = 4
        ${!invoiceDonate ? '' : `donateUnit: "${invoiceDonate}"`}
      }`
      }
    }]) {
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
`;
