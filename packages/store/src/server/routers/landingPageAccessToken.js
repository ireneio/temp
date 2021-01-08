/* eslint-disable no-console */

const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = async (req, res) => {
  const response = await fetch(`${API_HOST}/auth/landing_page/access_token`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-meepshop-domain': req.get('x-meepshop-domain'),
    },
    credentials: 'include',
    body: JSON.stringify({
      email: req.body.email,
    }),
  });

  if (response.status >= 400)
    throw new Error(`${response.status}: ${response.statusText}(${response})`);

  const { token, ...data } = await response.json();

  res.cookie('x-meepshop-authorization-landing-page-token', token, {
    maxAge: 86400 * 1 * 1000,
    httpOnly: true,
  });
  res.json(data);
};
