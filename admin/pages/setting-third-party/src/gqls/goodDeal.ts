// import
import gql from 'graphql-tag';

// definition
export const goodDealFragment = gql`
  fragment goodDealFragment on gooddealObjectType {
    corporationId
    apiKey
  }
`;
