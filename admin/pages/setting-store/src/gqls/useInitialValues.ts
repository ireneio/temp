// import
import { gql } from '@apollo/client';

// graphql import
import { useUploadImageOnScaledURLsFragment } from '@admin/media-gallery/gqls';

// definition
export const useInitialValuesFragment = gql`
  fragment useInitialValuesFragment on Store {
    id
    locale
    timezone
    domain
    description {
      name
      introduction
    }
    setting {
      senderInfo {
        name
        phoneNumber
        streetAddress
      }
    }
    logoImage {
      id
      scaledSrc {
        ...useUploadImageOnScaledURLsFragment
      }
    }
    mobileLogoImage {
      id
      scaledSrc {
        ...useUploadImageOnScaledURLsFragment
      }
    }
    faviconImage {
      id
      scaledSrc {
        ...useUploadImageOnScaledURLsFragment
      }
    }
    metaData {
      storeStatus
    }
  }

  ${useUploadImageOnScaledURLsFragment}
`;
