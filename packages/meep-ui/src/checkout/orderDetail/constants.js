export const CHECK_USER_EMAIL = `
  query checkUserEmailInCheckout($email: String) {
    checkUserInfo(search: {
      filter: {
        and: [{
          type: "exact"
          field: "email"
          query: $email
        }, {
          type: "exact"
          field: "type"
          query: "shopper"
        }]
      }
    }) {
      exists
    }
  }
`;
