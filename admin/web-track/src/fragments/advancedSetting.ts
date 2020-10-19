// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment advancedSettingFragment on Store {
    id
    setting {
      adRetentionMillisecondsEnabled
      adRetentionMilliseconds
    }
  }
`;
