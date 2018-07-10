const orderQAQuery = `
  userId
  orderId
  id
  qa {
    id
    question
    createdOn
    createdBy
  }
  orderInfo {
    orderNo
  }
`;

export default orderQAQuery;
