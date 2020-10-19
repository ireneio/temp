// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment useHeightFragment on GoogleMapModule {
    id
    width
    height
  }
`;
