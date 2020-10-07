// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment draftTextFragment on DraftTextModule {
    id
    content
  }
`;
