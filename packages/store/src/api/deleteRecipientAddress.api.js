import postGraphql from 'utils/postGraphql';

export default values =>
  postGraphql({
    query: `
    deleteRecipientAddress(input: $input) {
      status
    }
  `,
    variables: {
      keys: '$input: DeleteRecipientAddressInput!',
      type: 'mutation deleteRecipientAddress',
      values,
    },
  });
