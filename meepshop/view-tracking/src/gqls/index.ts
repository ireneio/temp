// import
import gql from 'graphql-tag';

// definition
export const viewTrackingFragment = gql`
  fragment viewTrackingFragment on ViewTrackingModule {
    id
    tracking {
      name
      category
    }
  }
`;
