// import
import { gql } from '@apollo/client';

// definition
export const lineLineLoginSettingFragment = gql`
  fragment lineLineLoginSettingFragment on LineLoginSetting {
    channelId
    channelSecret
  }
`;
