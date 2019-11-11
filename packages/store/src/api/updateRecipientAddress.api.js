import postGraphql from 'utils/postGraphql';

export default values =>
  postGraphql({
    query: `
    updateRecipientAddress(input: $input) {
      status
    }
  `,
    variables: {
      keys: '$input: UpdateRecipientAddressInput!',
      type: 'mutation updateRecipientAddress',
      values,
    },
  });
