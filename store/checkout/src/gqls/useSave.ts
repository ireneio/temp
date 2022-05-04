// import
import { gql } from '@apollo/client';

// graphql import
import { useCreateOrderFragment } from './useCreateOrder';
import { useUpdateUserFragment } from './useUpdateUser';

// definition
export const useSaveUserFragment = gql`
  fragment useSaveUserFragment on User {
    id
    name
    mobile
    additionalInfo {
      mobile
    }
    email
    ...useCreateOrderFragment
    ...useUpdateUserFragment
  }

  ${useCreateOrderFragment}
  ${useUpdateUserFragment}
`;
