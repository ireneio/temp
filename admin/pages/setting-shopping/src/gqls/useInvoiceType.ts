// import
import { gql } from '@apollo/client';

// definition
export const useInvoiceTypeFragment = gql`
  fragment useInvoiceTypeFragment on StoreInvoiceSetting {
    paper {
      duplicate {
        isEnabled
      }
      triplicate {
        isEnabled
      }
      donation {
        isEnabled
      }
    }
    electronic {
      type
      isDelay
      delayDays
      ecpay {
        MerchantID
        HashKey
        HashIV
      }
      triplicate {
        isEnabled
      }
      donation {
        isEnabled
      }
      membershipCarrier {
        isEnabled
      }
      citizenDigitalCertificateCarrier {
        isEnabled
      }
      mobileBarCodeCarrier {
        isEnabled
      }
    }
  }
`;
