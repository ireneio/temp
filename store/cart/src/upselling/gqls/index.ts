// import
import gql from 'graphql-tag';

// graphql import
import { productFragment } from './product';

// definition
export const upsellingFragment = gql`
  fragment upsellingFragment on ActiveUpsellingArea {
    id
    title
    hasLimitPerOrder
    limitPerOrder
    products {
      id
      ...productFragment
    }
  }

  ${productFragment}
`;
