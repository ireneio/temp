// import
import gql from 'graphql-tag';

// definition
export const draftTextFragment = gql`
  fragment draftTextFragment on DraftTextModule {
    id
    content
  }
`;
