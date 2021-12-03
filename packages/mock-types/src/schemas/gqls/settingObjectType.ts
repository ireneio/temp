// import
import { gql } from '@apollo/client';

// definition
export const settingObjectTypeMockFragment = gql`
  fragment settingObjectTypeMockFragment on SettingObjectType {
    lockedBirthday
  }
`;
