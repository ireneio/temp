export const GET_PRODUCT_QA_LIST = `
  query getProductQAList($productId: String) {
    getProductQAList(search: {
      filter: {
        and: [
          {
            field: "productId"
            query: $productId
            type: "exact"
          }
        ]
      }
      sort: {
        field: "createdOn"
        order: "desc"
      }
    }) {
      data {
        userEmail
        qa {
          question
          createdOn
        }
      }
    }
  }
`;

export const CREATE_PRODUCT_QA = `
  mutation createProductQA($createProductQA: [NewProductQA]) {
    createProductQA(createProductQA: $createProductQA) {
      userEmail
      qa {
        question
        createdOn
      }
    }
  }
`;
