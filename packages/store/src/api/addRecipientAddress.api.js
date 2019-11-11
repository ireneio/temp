import postGraphql from 'utils/postGraphql';

export default values =>
  postGraphql({
    query: `
    addRecipientAddress(input: $input) {
      status
      recipientAddressId
    }
  `,
    variables: {
      keys: '$input: AddRecipientAddressInput!',
      type: 'mutation addRecipientAddress',
      values,
    },
  });
