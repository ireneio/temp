// import
import { gql } from '@apollo/client';

// graphql import
import { useBlocksFragment } from './useBlocks';

// definition
export const getThirdPartySetting = gql`
  query getThirdPartySetting {
    viewer {
      id
      store {
        id
        ...useBlocksFragment
      }
    }
  }

  ${useBlocksFragment}
`;
