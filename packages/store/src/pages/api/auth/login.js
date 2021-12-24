// import
import getConfig from 'next/config';

import proxy from 'utils/proxy';

// definition
const {
  publicRuntimeConfig: { API },
} = getConfig();

export default proxy(`${API}/auth/login`, (req, res, response) => {
  const token = response.headers.get('x-meepshop-authorization-token') || '';

  res.cookie('x-meepshop-authorization-token', token, {
    maxAge: 86400 * 1000 * 7,
    httpOnly: true,
  });
});
