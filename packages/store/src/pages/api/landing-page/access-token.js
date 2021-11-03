// import
import getConfig from 'next/config';

import proxy from 'utils/proxy';

// definition
const {
  publicRuntimeConfig: { API },
} = getConfig();

export default proxy(
  `${API}/auth/landing_page/access_token`,
  async (req, res, response) => {
    const { token, ...data } = await response.json();

    res.cookie('x-meepshop-authorization-landing-page-token', token, {
      maxAge: 86400 * 1 * 1000,
      httpOnly: true,
    });

    return JSON.stringify(data);
  },
);
