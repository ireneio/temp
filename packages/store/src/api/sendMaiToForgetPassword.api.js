import postGraphql from 'lib/postGraphql';

export default async function({ email }) {
  const variables = {
    keys: '$obj: [ForgotPS]',
    type: 'mutation SendMaiToForgetPassword',
    values: {
      obj: {
        email,
        type: 'SHOPPER',
      },
    },
  };
  const query = `
    forgotUserPSList( forgotUserPSList: $obj) {
      status
      error
    }
  `;
  const response = await postGraphql({ query, variables });
  return response;
}
