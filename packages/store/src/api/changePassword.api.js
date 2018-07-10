import postGraphql from 'lib/postGraphql';

export default async function({ currentPassword, newPassword }) {
  const variables = {
    keys: '$changeUserPassword: ChangeUserPassword',
    type: 'mutation ChangePassword',
    values: {
      changeUserPassword: {
        currentPassword,
        newPassword,
      },
    },
  };
  const query = `
  changeUserPassword(changeUserPassword: $changeUserPassword) {
    status,
    error
  }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
