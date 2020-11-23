import postGraphql from 'utils/postGraphql';
import { viewer } from './query';

export default async (args = {}) => {
  const { XMeepshopDomain, cookie } = args;
  const variables = {
    keys: '$expireBy: Int!',
    type: 'query updateMemberData',
    values: {
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
    },
  };

  const query = `
    ${viewer}
  `;

  const response = await postGraphql({
    query,
    variables,
    XMeepshopDomain,
    cookie,
  });
  return response;
};
