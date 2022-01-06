// import
import { gql } from '@apollo/client';

// definition
export const useUploadImagesScaledURLsFragment = gql`
  fragment useUploadImagesScaledURLsFragment on ScaledURLs {
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

export const useUploadImagesUserFragment = gql`
  fragment useUploadImagesUserFragment on User {
    __typename
    id
    images(first: $first, after: $after, filter: $filter)
      @connection(key: "images", filter: ["filter"]) {
      __typename
      edges {
        __typename
        node {
          __typename
          id
          scaledSrc {
            __typename
            ...useUploadImagesScaledURLsFragment
          }
        }
      }
    }
  }

  ${useUploadImagesScaledURLsFragment}
`;

export const uploadImages = gql`
  mutation uploadImages($input: CreateImagesInput!) {
    createImages(input: $input) {
      ... on CreateImagesSuccessResponse {
        __typename
        images {
          __typename
          id
          scaledSrc {
            __typename
            ...useUploadImagesScaledURLsFragment
          }
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

  ${useUploadImagesScaledURLsFragment}
`;
