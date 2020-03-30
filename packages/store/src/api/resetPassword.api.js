import postGraphql from 'utils/postGraphql';

export default ({ password, token }) =>
  postGraphql({
    query: `
      setUserPasswordByToken(input: $input) {
        status
      }
    `,
    variables: {
      keys: '$input: SetUserPasswordByTokenInput!',
      type: 'mutation setUserPasswordByToken',
      values: {
        input: {
          token,
          password,
        },
      },
    },
  });
