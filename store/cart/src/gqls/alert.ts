// import
import { gql } from '@apollo/client';

// definition
export const alertFragment = gql`
  fragment alertFragment on ActiveUpsellingArea {
    id
    limitPerOrder
  }
`;
