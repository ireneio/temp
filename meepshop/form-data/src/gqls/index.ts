// import
import gql from 'graphql-tag';

// definition
export const logFormData = gql`
  mutation logFormData($input: LogInput!) {
    log(input: $input) @client
  }
`;

export const formDataFragment = gql`
  fragment formDataFragment on outformDataObjectType {
    url
    type
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
  }
`;