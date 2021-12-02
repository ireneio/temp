// import
import { gql } from '@apollo/client';

// definition
export const usePaymentsLandingPageModuleFragment = gql`
  fragment usePaymentsLandingPageModuleFragment on LandingPageModule {
    id
    storePayments {
      id
    }
  }
`;

export const usePaymentsOrderFragment = gql`
  fragment usePaymentsOrderFragment on Order {
    id
    categories {
      paymentList: paymentTemplates {
        name
        paymentId
        template
        description
        accountInfo {
          gmo {
            isInstallment
            paymentType
          }
          allpay {
            ChoosePayment
          }
        }
        paymentLater
      }
    }
  }
`;
