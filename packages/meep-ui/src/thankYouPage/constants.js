export const GET_ORDER = `
  query getOrderInThankYouPage($orderId: [String]) {
    getOrderList(search: {
      filter: {
        and: [{
          type: "ids"
          ids: $orderId
        }]
      }
    }) {
      total
    }
  }
`;
