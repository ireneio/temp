// import
import { gql } from '@apollo/client';

// definition
export const setGtagSettingsList = gql`
  mutation setGtagSettingsList($setInput: [setGtagInput]) {
    setGtagSettingsList(setInput: $setInput) {
      eventName
      trackingId
    }
  }
`;
