import { lowerFirst } from 'lodash';
import moment from 'moment';

import cliOptions from './cliOptions';

export default async () => {
  const res = await fetch('http://localhost:14401/signin', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      email: cliOptions.email,
      password: cliOptions.password,
    }),
  });

  return res.headers
    .get('set-cookie')
    .split(/;[ ]?/)
    .reduce((result, text) => {
      const [key, value = true] = text.split(/=/);

      switch (key) {
        case 'x-meepshop-authorization-token':
          return {
            ...result,
            name: key,
            value,
          };

        case 'Expires':
          return {
            ...result,
            expires: moment(value).unix(),
          };

        default:
          return {
            ...result,
            [lowerFirst(key)]: value,
          };
      }
    }, {});
};
