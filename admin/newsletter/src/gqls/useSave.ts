// import
import { gql } from '@apollo/client';

// definition
export const useSaveNewsLetterFragment = gql`
  fragment useSaveNewsLetterFragment on NewsLetter {
    id
    status
    subject
    template
    toUsers {
      from
      filter {
        and {
          field
          query
          type
        }
      }
    }
    sentAt
    totalUsers
  }
`;

export const useSaveGetNewsLetterList = gql`
  query useSaveGetNewsLetterList($search: searchInputObjectType) {
    getNewsLetterList(search: $search) @connection(key: "newsLetter") {
      data {
        ...useSaveNewsLetterFragment
      }
    }
  }

  ${useSaveNewsLetterFragment}
`;

export const sendNewsLetter = gql`
  mutation sendNewsLetter($sendNewsLetter: SendNewsLetterList) {
    sendNewsLetter(sendNewsLetter: $sendNewsLetter) {
      id
      status
      totalUsers
    }
  }
`;

export const updateNewsLetterList = gql`
  mutation updateNewsLetterList(
    $isNew: Boolean!
    $createNewsLetterList: [NewNewsLetter]
    $updateNewsLetterList: [UpdateNewsLetter]
  ) {
    createNewsLetterList(createNewsLetterList: $createNewsLetterList)
      @include(if: $isNew) {
      ...useSaveNewsLetterFragment
    }

    updateNewsLetterList(updateNewsLetterList: $updateNewsLetterList)
      @skip(if: $isNew) {
      ...useSaveNewsLetterFragment
    }
  }

  ${useSaveNewsLetterFragment}
`;
