// import
import { gql } from '@apollo/client';

// definition
export const userPointsMockFragment = gql`
  fragment userPointsMockFragment on UserPoints {
    title {
      zh_TW
    }
    activity {
      zh_TW
    }
    note
    points
  }
`;
