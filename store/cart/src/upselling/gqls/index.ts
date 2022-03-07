// import
import { gql } from '@apollo/client';

// graphql import
import {
  productUserFragment,
  productProductFragment,
  productLineItemFragment,
} from './product';
import {
  useCheckLimitActiveUpsellingAreaFragment,
  useCheckLimitLineItemFragment,
} from './useCheckLimit';

// definition
export const upsellingUserFragment = gql`
  fragment upsellingUserFragment on User {
    id
    store {
      id
      activeUpsellingArea {
        id
        title
        hasLimitPerOrder
        limitPerOrder
        products {
          id
          ...productProductFragment
        }
        ...useCheckLimitActiveUpsellingAreaFragment
      }
    }
    ...productUserFragment
  }

  ${productUserFragment}
  ${productProductFragment}
  ${useCheckLimitActiveUpsellingAreaFragment}
`;

export const upsellingLineItemFragment = gql`
  fragment upsellingLineItemFragment on LineItem {
    ...productLineItemFragment
    ...useCheckLimitLineItemFragment
  }

  ${productLineItemFragment}
  ${useCheckLimitLineItemFragment}
`;
