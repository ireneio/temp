// import
import { gql } from '@apollo/client';

// graphql import
import { formDataFragment } from '@meepshop/form-data/gqls';
import { createOrderFragment } from '@meepshop/utils/lib/gqls/createOrder';

// defintion
export const useCreateOrderInLandingPageFragment = gql`
  fragment useCreateOrderInLandingPageFragment on User {
    id
    role
  }
`;

export const landingPageAccessToken = gql`
  mutation landingPageAccessToken($input: LandingPageAccessTokenInput!) {
    landingPageAccessToken(input: $input) @client {
      status
      userId
    }
  }
`;

export const createOrderInLandingPage = gql`
  mutation createOrderInLandingPage($input: CreateOrderInput!) {
    createOrder(input: $input) {
      order {
        id

        formData {
          ...formDataFragment
        }

        ...createOrderFragment
      }
    }
  }

  ${formDataFragment}
  ${createOrderFragment}
`;
