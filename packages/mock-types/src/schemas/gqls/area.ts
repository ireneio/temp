// import
import { gql } from '@apollo/client';

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
