// import
import gql from 'graphql-tag';

// graphql import
import { useLoadMoreImagesFragment } from './useLoadMoreImages';
import {
  useUploadImagesFileFragment,
  useUploadImageOnScaledURLsFragment,
} from './useUploadImages';

// definition
export { useUploadImageOnScaledURLsFragment };
export const getImages = gql`
  query getImages(
    $search: searchInputObjectType
    $first: PositiveInt
    $after: String
    $filter: FileFilterInput
  ) {
    viewer {
      id
      files(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ...useUploadImagesFileFragment
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

  ${useUploadImagesFileFragment}
  ${useLoadMoreImagesFragment}
`;
