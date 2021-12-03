// import
import { gql } from '@apollo/client';

// definition
export const updateUpsellingSetting = gql`
  mutation updateUpsellingSetting($input: UpdateUpsellingSettingInput!) {
    updateUpsellingSetting(input: $input) {
      ... on OkResponse {
        message
      }
      ... on ProductLimitError {
        message
      }
      ... on TimeRangeError {
        message
      }
      ... on TitleCharacterLimitError {
        message
      }
      ... on UnhandledError {
        message
      }
    }
  }
`;

export const useUpdateUpsellingSettingFragment = gql`
  fragment useUpdateUpsellingSettingFragment on UpsellingSetting {
    title
    isActive
    startTime
    endTime
    hasUnlimitedDuration
    hasLimitPerOrder
    limitPerOrder
    products {
      id
    }
  }
`;
