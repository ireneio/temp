// import
import gql from 'graphql-tag';

// graphql import
import { formDataFragment } from '@meepshop/form-data/gqls';
import { createOrderFragment } from '@meepshop/utils/lib/gqls/createOrder';

// defintion
export const useCreateOrderFragment = gql`
  fragment useCreateOrderFragment on User {
    id
    role
  }
`;

export const landingPageAccessToken = gql`
  mutation landingPageAccessToken($input: LandingPageAccessTokenInput!) {
    landingPageAccessToken(input: $input) @client {
      status
    }
  }
`;

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
