// import
import gql from 'graphql-tag';

// graphql import
import { useImageImageFragment } from '@meepshop/image/lib/gqls/useImage';

// definition
export const smartConversionFragment = gql`
  fragment smartConversionFragment on SmartConversionModule {
    id
    displaySample(token: $smartConversionToken) {
      eventName
      image {
        ...useImageImageFragment
      }
    }
    width
    align
    imageAlt
  }

  ${useImageImageFragment}
`;
