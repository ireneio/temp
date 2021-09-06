import postGraphql from 'utils/postGraphql';
import { viewer } from './query';

export default async context => {
  const variables = {
    keys: `
      $expireBy: Int!,
    `,
    type: 'query serverOthersInitial',
    values: {
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
    },
  };

  const query = `
    ${viewer}
  `;

  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
};
