// import
import { gql } from '@apollo/client';

// definition
export const useInvoiceOptionsStoreInvoiceSettingFragment = gql`
  fragment useInvoiceOptionsStoreInvoiceSettingFragment on StoreInvoiceSetting {
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
      type
    }
  }
`;
