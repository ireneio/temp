// import
import { gql } from '@apollo/client';

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
