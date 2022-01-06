// import
import { gql } from '@apollo/client';

// graphql import
import { useLoadMoreImagesFragment } from './useLoadMoreImages';
import {
  useUploadImagesUserFragment,
  useUploadImagesScaledURLsFragment,
} from './useUploadImages';

// definition
export { useUploadImagesScaledURLsFragment };

export const getImages = gql`
  query getImages(
    $search: searchInputObjectType
    $first: PositiveInt
    $after: String
    $filter: ImageFilterInput
  ) {
    viewer {
      id
      ...useUploadImagesUserFragment

      images(first: $first, after: $after, filter: $filter)
        @connection(key: "images", filter: ["filter"]) {
        pageInfo {
          ...useLoadMoreImagesFragment
        }
      }
    }

    getTagList(search: $search) {
      data {
        id
        tags
      }
    }
  }

  ${useUploadImagesUserFragment}
  ${useLoadMoreImagesFragment}
`;
