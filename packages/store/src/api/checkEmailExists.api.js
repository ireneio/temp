import postGraphql from 'lib/postGraphql';
import { getIn } from 'utils';

export default async function({ email }) {
  const variables = {
    keys: '$search: searchInputObjectType',
    type: 'query CheckEmailExists',
    values: {
      search: {
        filter: {
          and: [
            {
              type: 'exact',
              field: 'email',
              query: email,
            },
            {
              type: 'exact',
              field: 'type',
              query: 'shopper',
            },
          ],
        },
      },
    },
  };
  const query = `
    checkUserInfo(search: $search) {
      exists
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  const isExists = getIn(['data', 'checkUserInfo', 'exists'])(response);
  return isExists;
}
