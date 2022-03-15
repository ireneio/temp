// import
import { serialize } from 'cookie';
import { add } from 'date-fns';

import proxy from 'utils/proxy';

// definition
export default proxy(
  `${process.env.MEEPSHOP_API}/auth/landing_page/access_token`,
  async (req, res, response) => {
    const { token, ...data } = await response.json();

    res.setHeader(
      'Set-Cookie',
      serialize('x-meepshop-authorization-landing-page-token', token, {
        maxAge: 86400 * 1 * 1000,
        expires: add(new Date(), { days: 7 }),
        path: '/',
        httpOnly: true,
      }),
    );

    return JSON.stringify(data);
  },
);
