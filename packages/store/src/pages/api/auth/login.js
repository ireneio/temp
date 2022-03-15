// import
import { serialize } from 'cookie';
import { add } from 'date-fns';

import proxy from 'utils/proxy';

// definition
export default proxy(
  `${process.env.MEEPSHOP_API}/auth/login`,
  (req, res, response) => {
    const token = response.headers.get('x-meepshop-authorization-token') || '';

    res.setHeader(
      'Set-Cookie',
      serialize('x-meepshop-authorization-token', token, {
        maxAge: 86400 * 1000 * 7,
        expires: add(new Date(), { days: 7 }),
        path: '/',
        httpOnly: true,
      }),
    );
  },
);
