// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment viewTrackingFragment on ViewTrackingModule {
    id
    tracking {
      name
      category
    }
  }
`;
