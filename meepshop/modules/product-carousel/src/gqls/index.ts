// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

import { useImagesFragment } from './useImages';

// definition
export const productCarouselProductFragment = gql`
  fragment productCarouselProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    ...useImagesFragment
  }

  ${localeFragment}
  ${useImagesFragment}
`;

export const productCarouselProductCarouselModuleFragment = gql`
  fragment productCarouselProductCarouselModuleFragment on ProductCarouselModule {
    id
    productCarouselType
    autoPlay
    product {
      id
      ...productCarouselProductFragment
    }
  }

  ${productCarouselProductFragment}
`;
