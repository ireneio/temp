// import
import { gql } from '@apollo/client';

// definition
export const recipientCommentFragment = gql`
  fragment recipientCommentFragment on StoreSettingOrderRecipientCommentSetting {
    isRequired
    placeHolder
  }
`;
