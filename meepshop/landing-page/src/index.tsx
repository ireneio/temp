// typescript import
import { MutationFunction } from '@apollo/react-common';

// import
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  createOrderInLandingPage as createOrderInLandingPageType,
  createOrderInLandingPageVariables,
} from './__generated__/createOrderInLandingPage';

// typescript definition
interface PropsType {
  children: (data: {
    createOrderInLandingPage: MutationFunction<
      createOrderInLandingPageType,
      createOrderInLandingPageVariables
    >;
  }) => React.ReactElement;
}

// definition
const mutation = gql`
  mutation createOrderInLandingPage($createOrderList: [NewOrder]) {
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
`;

export default React.memo(({ children }: PropsType) => {
  const [createOrderInLandingPage] = useMutation<
    createOrderInLandingPageType,
    createOrderInLandingPageVariables
  >(mutation);

  return children({ createOrderInLandingPage });
});
