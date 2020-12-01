// import
import gql from 'graphql-tag';

// graphql import
import { formDataFragment } from '@meepshop/form-data/lib/gqls';
import createOrderFragment from '@meepshop/utils/lib/fragments/createOrder';

// definition
export const createOrderInLandingPage = gql`
  mutation createOrderInLandingPage($createOrderList: [NewOrder]) {
    createOrderList(createOrderList: $createOrderList) {
      id

      formData {
        ...formDataFragment
      }

      ...createOrderFragment
    }
  }

  ${formDataFragment}
  ${createOrderFragment}
`;
