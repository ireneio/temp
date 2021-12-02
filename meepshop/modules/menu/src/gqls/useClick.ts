// import
import { gql } from '@apollo/client';

// definition
export const useClickUserFragment = gql`
  fragment useClickUserFragment on User {
    id
    role
  }
`;

export const useClickMenuPageObjectTypeFragment = gql`
  fragment useClickMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
  }
`;

export const updateShopperLanguagePreference = gql`
  mutation updateShopperLanguagePreference(
    $input: UpdateShopperLanguagePreferenceInput!
  ) {
    ## FIXME: T6711
    updateShopperLanguagePreference(input: $input) {
      status
    }
  }
`;

export const logout = gql`
  mutation logout {
    logout @client {
      status
    }
  }
`;

export const updateLocaleCache = gql`
  fragment updateLocaleCache on User {
    id
    locale
  }
`;
