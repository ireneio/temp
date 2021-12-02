// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { useImagesFragment } from './useImages';

// definition
export const productCarouselFragment = gql`
  fragment productCarouselFragment on ProductCarouselModule {
    id
    productCarouselType
    autoPlay
    product {
      id
      title {
        ...localeFragment
      }
      ...useImagesFragment
    }
  }

  ${localeFragment}
  ${useImagesFragment}
`;
