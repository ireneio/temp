// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment useColumnsUserPointsFragment on UserPoints {
    id
    title {
      zh_TW
    }
    activity {
      zh_TW
    }
    note
    points
    startTime
    endTime
  }
`;