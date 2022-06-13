// import
import { gql } from '@apollo/client';

// graphql import
import { useInvoiceTypeFragment } from './useInvoiceType';

// definition
export const useShoppingInitialValuesFragment = gql`
  fragment useShoppingInitialValuesFragment on SettingObjectType {
    locale
    currency
    lockedCountry
    checkoutFields {
      name
      mobile
      address
    }
    invoice {
      ...useInvoiceTypeFragment
    }
    order {
      useNotPayNow
      afterPaymentFail
      autoAddStock
      recipientComment {
        isRequired
        placeHolder
      }
    }
    paidMessage
    lockedBirthday
    rewardPointReminder {
      isEnabled
      daysPrior
    }
    backToTopButtonEnabled
    shopperLoginMessageEnabled
    shopperLoginMessage
    shopperLoginMessageDraft @client
  }

  ${useInvoiceTypeFragment}
`;
