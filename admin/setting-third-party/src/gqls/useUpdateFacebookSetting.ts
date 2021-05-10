// import
import gql from 'graphql-tag';

// definition
export const updateFacebookSetting = gql`
  mutation updateFacebookSetting($input: UpdateFacebookSettingInput!) {
    updateFacebookSetting(input: $input) {
      status
    }
  }
`;

export const useUpdateFacebookSettingFragment = gql`
  fragment useUpdateFacebookSettingFragment on Store {
    id
    facebookSetting {
      isLoginEnabled
      appId
      appSecret
    }
  }
`;
