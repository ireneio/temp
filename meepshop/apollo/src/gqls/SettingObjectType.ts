// import
import { gql } from '@apollo/client';

// definition
export const SettingObjectTypeFragment = gql`
  fragment SettingObjectTypeFragment on SettingObjectType {
    shopperLoginMessage
  }
`;
