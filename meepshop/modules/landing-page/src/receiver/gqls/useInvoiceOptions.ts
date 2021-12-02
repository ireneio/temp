// import
import { gql } from '@apollo/client';

// definition
export const useInvoiceOptionsFragment = gql`
  fragment useInvoiceOptionsFragment on SettingObjectType {
    invoice {
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
  }
`;
