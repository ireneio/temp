// import
import gql from 'graphql-tag';

// definition
export const setGtagSettingsList = gql`
  mutation setGtagSettingsList($setInput: [setGtagInput]) {
    setGtagSettingsList(setInput: $setInput) {
      eventName
      trackingId
    }
  }
`;
