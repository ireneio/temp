// import
import gql from 'graphql-tag';

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
