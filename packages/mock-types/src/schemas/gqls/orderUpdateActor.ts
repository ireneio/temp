// import
import gql from 'graphql-tag';

// definition
export const orderUpdateActorMockFragment = gql`
  fragment orderUpdateActorMockFragment on OrderUpdateActor {
    type
    name
    email
  }
`;
