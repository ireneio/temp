// import
import { gql } from '@apollo/client';

// definition
export const draftTextFragment = gql`
  fragment draftTextFragment on DraftTextModule {
    id
    content
  }
`;
