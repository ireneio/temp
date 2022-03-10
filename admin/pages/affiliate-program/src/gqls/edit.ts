// import
import { gql } from '@apollo/client';

// graphql import
import { useProgramInitialValuesFragment } from './useProgramInitialValues';
import { useUpdateAffiliateProgramFragment } from './useUpdateAffiliateProgram';
import { promoCodeExampleFragment } from './promoCodeExample';

// definition
export const getProgram = gql`
  query getProgram($id: ID!, $isAdd: Boolean!) {
    viewer {
      id
      affiliateProgram(id: $id) @skip(if: $isAdd) {
        id
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
  ${useUpdateAffiliateProgramFragment}
  ${promoCodeExampleFragment}
`;
