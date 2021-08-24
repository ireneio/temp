import gql from 'graphql-tag';

const productQAFragment = gql`
  fragment productQAFragment on ProductQA {
    userEmail
    qa {
      question
      createdAt
    }
  }
`;

export const getProductQA = gql`
  query getProductQA($productId: String) {
    getProductQAList(
      search: {
        filter: {
          and: [{ field: "productId", query: $productId, type: "exact" }]
        }
        sort: { field: "createdAt", order: "desc" }
      }
    ) {
      data {
        ...productQAFragment
      }
    }
  }

  ${productQAFragment}
`;

export const createProductQA = gql`
  mutation createProductQA($createProductQA: [NewProductQA]) {
    createProductQA(createProductQA: $createProductQA) {
      ...productQAFragment
    }
  }

  ${productQAFragment}
`;
