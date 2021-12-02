// import
import { gql } from '@apollo/client';

// graphql import
import { useAddNewMessageFragment } from './useAddNewMessage';

// definition
export const qaOrderFragment = gql`
  fragment qaOrderFragment on Order {
    id
    ...useAddNewMessageFragment
  }

  ${useAddNewMessageFragment}
`;
