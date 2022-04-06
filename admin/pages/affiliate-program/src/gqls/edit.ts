// import
import { gql } from '@apollo/client';

// graphql import
import { useProgramInitialValuesFragment } from './useProgramInitialValues';
import { useCreateAffiliateProgramFragment } from './useCreateAffiliateProgram';
import { useUpdateAffiliateProgramFragment } from './useUpdateAffiliateProgram';
import { promoCodeExampleFragment } from './promoCodeExample';

// definition
export const getProgram = gql`
  query getProgram($id: ID!, $isAdd: Boolean!) {
    viewer {
      id
      ...useCreateAffiliateProgramFragment
      affiliateProgram(id: $id) @skip(if: $isAdd) {
        id
        status
        ...useProgramInitialValuesFragment
        ...useUpdateAffiliateProgramFragment
      }
      store {
        id
        ...promoCodeExampleFragment
      }
    }
  }

  ${useProgramInitialValuesFragment}
  ${useCreateAffiliateProgramFragment}
  ${useUpdateAffiliateProgramFragment}
  ${promoCodeExampleFragment}
`;
