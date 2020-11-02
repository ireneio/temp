// import
import gql from 'graphql-tag';

// definition
export const areaMockFragment = gql`
  fragment areaMockFragment on Area {
    id
    name {
      zh_TW
    }
    zipCodes
  }
`;
