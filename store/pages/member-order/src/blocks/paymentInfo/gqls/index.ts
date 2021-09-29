// import
import gql from 'graphql-tag';

// graphql import
import { descriptionFragment } from './description';
import { creditFragment } from './credit';
import { allpayFragment } from './allPay';
import { ecpayFragment } from './ecpay';
import { ezpayFragment } from './ezpay';
import { gmoOrderFragment } from './gmo';
import { cathayAtmOrderFragment } from './cathayAtm';
import { transactionNoFragment } from './transactionNo';

// definition
export const paymentInfoFragment = gql`
  fragment paymentInfoFragment on Order {
    id
    ...descriptionFragment
    ...gmoOrderFragment
    ...cathayAtmOrderFragment
    paymentInfo {
      ...creditFragment
      ...allpayFragment
      ...ecpayFragment
      ...ezpayFragment
      ...transactionNoFragment
      id
      list {
        id
        template
        accountInfo {
          allpay {
            choosePayment: ChoosePayment
          }
          ecpay2 {
            choosePayment: ChoosePayment
          }
          ezpay {
            choosePayment: ezpayPaymentType
          }
          gmo {
            choosePayment: paymentType
          }
          cathay {
            choosePayment: type
          }
          cathay_atm: cathay {
            choosePayment: type
          }
          chinatrust {
            choosePayment: type
          }
        }
      }
    }
  }

  ${descriptionFragment}
  ${creditFragment}
  ${allpayFragment}
  ${ecpayFragment}
  ${ezpayFragment}
  ${gmoOrderFragment}
  ${cathayAtmOrderFragment}
  ${transactionNoFragment}
`;
