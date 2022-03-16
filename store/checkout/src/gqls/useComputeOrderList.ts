// import
import { gql } from '@apollo/client';

// graphql import
import { paymentOrderFragment } from './payment';
import { discountFragment } from './discount';
import { productsFragment } from './products';
import { totalOrderFragment } from './total';

// definition
export const computeOrderList = gql`
  mutation computeOrderList($computeOrderList: [NewOrder]) {
    computeOrderList(computeOrderList: $computeOrderList) {
      ...paymentOrderFragment
      ...discountFragment
      ...productsFragment
      ...totalOrderFragment
    }
  }

  ${paymentOrderFragment}
  ${discountFragment}
  ${productsFragment}
  ${totalOrderFragment}
`;
