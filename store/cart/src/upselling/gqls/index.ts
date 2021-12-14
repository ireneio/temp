// import
import { gql } from '@apollo/client';

// graphql import
import { productProductFragment, productLineItemFragment } from './product';
import {
  useCheckLimitActiveUpsellingAreaFragment,
  useCheckLimitLineItemFragment,
} from './useCheckLimit';

// definition
export const upsellingActiveUpsellingAreaFragment = gql`
  fragment upsellingActiveUpsellingAreaFragment on ActiveUpsellingArea {
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
