// import
import gql from 'graphql-tag';

// graphql import
import { useBlocksFragment } from './useBlocks';
import { useSaveFragment } from './useSave';

// definition
export const getThirdPartySetting = gql`
  query getThirdPartySetting {
    viewer {
      id
      store {
        id
        ...useBlocksFragment
        ...useSaveFragment
      }
    }
  }

  ${useBlocksFragment}
  ${useSaveFragment}
`;
