// import
import { gql } from '@apollo/client';

// graphql import
import { useUploadImagesScaledURLsFragment } from '@admin/media-gallery/gqls';

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
        ...useUploadImagesScaledURLsFragment
      }
    }
    mobileLogoImage {
      id
      scaledSrc {
        ...useUploadImagesScaledURLsFragment
      }
    }
    faviconImage {
      id
      scaledSrc {
        ...useUploadImagesScaledURLsFragment
      }
    }
    metaData {
      storeStatus
    }
  }

  ${useUploadImagesScaledURLsFragment}
`;
