// import
import { gql } from '@apollo/client';

// graphql import
import { formUserFragment } from './form';
import { useRecipientColumnsUserFragment } from './useRecipientColumns';

// definition
export const getUserRecipients = gql`
  query getUserRecipients {
    viewer {
      id
      ...formUserFragment
      ...useRecipientColumnsUserFragment
    }
  }

  ${formUserFragment}
  ${useRecipientColumnsUserFragment}
`;
