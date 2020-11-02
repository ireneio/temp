// import
import gql from 'graphql-tag';

// definition
export const viewTrackingModuleMockFragment = gql`
  fragment viewTrackingModuleMockFragment on ViewTrackingModule {
    tracking {
      name
      category
    }
  }
`;
