// import
import gql from 'graphql-tag';

// graphql import
import { useAddNewMessageFragment } from './useAddNewMessage';

// definition
export const qaOrderFragment = gql`
  fragment qaOrderFragment on Order {
    ...useAddNewMessageFragment
  }

  ${useAddNewMessageFragment}
`;
