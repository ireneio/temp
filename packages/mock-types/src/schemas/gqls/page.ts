// import
import { gql } from '@apollo/client';

// definition
export const pageMockFragment = gql`
  fragment pageMockFragment on Page {
    id
    width
    title {
      zh_TW
    }
    useBottom
    container
  }
`;
