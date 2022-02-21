// import
import { gql } from '@apollo/client';

// definition
export const updateLineLoginSetting = gql`
  mutation updateLineLoginSetting($input: UpdateLineLoginSettingInput!) {
    updateLineLoginSetting(input: $input) {
      ... on OkResponse {
        message
      }
      ... on UnhandledError {
        message
      }
    }
  }
`;

export const useUpdateLineLoginSettingFragment = gql`
  fragment useUpdateLineLoginSettingFragment on Store {
    id
    lineLoginSetting {
      isLoginEnabled
      channelId
      channelSecret
    }
  }
`;
