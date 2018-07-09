/**  define if the order can be paid later */
export const paymentTable = {
  allpay: {
    Credit: 1,
    WebATM: 1,
    ATM: 0,
    CVS: 0,
    BARCODE: 0,
  },
  ezpay: {
    Credit: 0,
    CS: 0,
    ATM: 0,
    WEBATM: 0,
    MMK: 0,
  },
  hitrust: 1,
  gmo: 0,
  custom: 0,
};

export const PAY_AGAIN_QUERY = `
  mutation paymentAgainOrderList($paymentAgainOrderList: [PaymentAgainOrder]) {
    paymentAgainOrderList (paymentAgainOrderList: $paymentAgainOrderList) {
      id
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
      error: _error
    }
  }
`;
