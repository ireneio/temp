import postGraphql from 'lib/postGraphql';

export default async function({ password, token }) {
  const variables = {
    keys: '$updateUserPSList : [UpdateUserPS]',
    type: 'mutation resetPassword',
    values: {
      updateUserPSList: {
        password,
        token,
      },
    },
  };

  const query = `
  updateUserPSList(updateUserPSList: $updateUserPSList) {
      status
      error
    }
  `;
  const response = await postGraphql({ query, variables });
  return response;
}
