// import
import gql from 'graphql-tag';

// definition
export const useUploadImagesFileFragment = gql`
  fragment useUploadImagesFileFragment on File {
    id
    scaledSrc {
      h200
      w60
      w120
      w240
      w250
      w480
      w720
      w960
      w1200
      w1440
      w1680
      w1920
    }
  }
`;

export const useUploadImagesReadCache = gql`
  query useUploadImagesReadCache(
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
          hasNextPage
          endCursor
        }
      }
    }
  }

  ${useUploadImagesFileFragment}
`;

export const uploadImages = gql`
  mutation uploadImages($createFileList: [NewFile]) {
    createFileList(createFileList: $createFileList) {
      id
      ...useUploadImagesFileFragment
    }
  }
  ${useUploadImagesFileFragment}
`;
