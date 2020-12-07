// import
import gql from 'graphql-tag';

// graphql import
import { useImageImageFragment } from '@meepshop/image/lib/gqls';

// definition
export const smartConversionFragment = gql`
  fragment smartConversionFragment on SmartConversionModule {
    id
    displaySample(token: $identity) {
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
