// import
import gql from 'graphql-tag';

// graphql import
import { useUploadImageOnScaledURLsFragment } from '@admin/gallery/gqls';

// definition
export const cnameFragment = gql`
  fragment cnameFragment on Store {
    id
    cname
    description {
      name
      introduction
    }
    faviconImage {
      id
      scaledSrc {
        ...useUploadImageOnScaledURLsFragment
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
  }

  ${useUploadImageOnScaledURLsFragment}
`;
