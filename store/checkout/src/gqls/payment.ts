// import
import { gql } from '@apollo/client';

// definition
export const paymentOrderFragment = gql`
  fragment paymentOrderFragment on Order {
    categories {
      paymentList: paymentTemplates {
        paymentId
        name
        description
        template
        paymentLater
        accountInfo {
          allpay {
            ChoosePayment
          }
          gmo {
            isInstallment
            paymentType
          }
        }
      }
    }
  }
`;
