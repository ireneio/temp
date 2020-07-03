import postGraphql from 'utils/postGraphql';

export default ({ email, cname }) =>
  postGraphql({
    query: `
      sendResetPasswordEmail(input: $input) {
        status
      }
    `,
    variables: {
      keys: '$input: SendResetPasswordEmailInput!',
      type: 'mutation SendResetPasswordEmail',
      values: {
        input: {
          email,
          cname,
          type: 'SHOPPER',
        },
      },
    },
  });
