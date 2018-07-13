import postGraphql from 'utils/postGraphql';
import { userQuery } from './query';

export default async function(user) {
  const variables = {
    keys: '$updateUserList: [UpdateUser]',
    type: 'mutation UpdateUserList',
    values: {
      updateUserList: [user],
    },
  };

  const query = `
    updateUserList(updateUserList: $updateUserList) {
      ${userQuery}
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
