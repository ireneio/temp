// import
import gql from 'graphql-tag';

// graphql import
import { useLoadMoreImagesFragment } from './useLoadMoreImages';
import {
  useUploadImagesImageFragment,
  useUploadImageOnScaledURLsFragment,
} from './useUploadImages';

// definition
export { useUploadImageOnScaledURLsFragment };
export const getImages = gql`
  query getImages(
    $search: searchInputObjectType
    $first: PositiveInt
    $after: String
    $filter: ImageFilterInput
  ) {
    viewer {
      id
      images(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ...useUploadImagesImageFragment
          }
        }

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

  ${useUploadImagesImageFragment}
  ${useLoadMoreImagesFragment}
`;
