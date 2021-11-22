// import
import gql from 'graphql-tag';

// definition
export const useUploadImageOnScaledURLsFragment = gql`
  fragment useUploadImageOnScaledURLsFragment on ScaledURLs {
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
`;

export const useUploadImagesImageFragment = gql`
  fragment useUploadImagesImageFragment on Image {
    __typename
    id
    scaledSrc {
      __typename
      ...useUploadImageOnScaledURLsFragment
    }
  }

  ${useUploadImageOnScaledURLsFragment}
`;

export const useUploadImagesUserFragment = gql`
  fragment useUploadImagesUserFragment on User {
    __typename
    id
    images(first: $first, after: $after, filter: $filter) {
      __typename
      edges {
        __typename
        node {
          id
          ...useUploadImagesImageFragment
        }
      }

      pageInfo {
        __typename
        hasNextPage
        endCursor
      }
    }
  }

  ${useUploadImagesImageFragment}
`;

export const useUploadImagesWriteCache = gql`
  query useUploadImagesWriteCache(
    $first: PositiveInt
    $after: String
    $filter: ImageFilterInput
  ) {
    viewer {
      id
      ...useUploadImagesUserFragment
    }
  }

  ${useUploadImagesUserFragment}
`;

export const uploadImages = gql`
  mutation uploadImages($input: CreateImagesInput!) {
    createImages(input: $input) {
      ... on CreateImagesSuccessResponse {
        __typename
        images {
          id
          ...useUploadImagesImageFragment
        }
      }
      ... on DataLimitExceededError {
        message
      }
      ... on InvalidFileExtensionError {
        message
      }
    }
  }

  ${useUploadImagesImageFragment}
`;
