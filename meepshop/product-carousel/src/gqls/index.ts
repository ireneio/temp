// import
import gql from 'graphql-tag';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

import useImagesFragment from './useImages';

// definition
export default gql`
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
