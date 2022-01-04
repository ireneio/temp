// import
import { gql } from '@apollo/client';

// graphql import
import { useImageImageFragment } from '@meepshop/image/gqls';

// definition
export const smartConversionFragment = gql`
  fragment smartConversionFragment on SmartConversionModule {
    id
    displaySample {
      eventName
      image {
        ...useImageImageFragment
      }
    }
    width
    align
    imageAlt
    page {
      id
    }
  }

  ${useImageImageFragment}
`;
