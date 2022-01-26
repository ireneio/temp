// import
import { gql } from '@apollo/client';

// definition
export const lineFragment = gql`
  fragment lineFragment on LineLoginSetting {
    channelId
    isLoginEnabled
  }
`;
