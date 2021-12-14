// import
import { gql } from '@apollo/client';

// definition
export const useCheckLimitActiveUpsellingAreaFragment = gql`
  fragment useCheckLimitActiveUpsellingAreaFragment on ActiveUpsellingArea {
    id
    hasLimitPerOrder
    limitPerOrder
  }
`;

export const useCheckLimitLineItemFragment = gql`
  fragment useCheckLimitLineItemFragment on LineItem {
    id
    quantity
    type
  }
`;
