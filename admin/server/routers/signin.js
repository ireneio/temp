const proxy = require('express-http-proxy');

const { publicRuntimeConfig } = require('../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = proxy(API_HOST, {
  proxyReqPathResolver: () => '/auth/login',
  userResDecorator: async (proxyRes, proxyResData, userReq, userRes) => {
    const data = JSON.parse(proxyResData.toString('utf8'));
    if (data.error) return JSON.stringify({ error: data.error });

    // TODO: Remove this when api removing set-cookie
    userRes.cookie(
      `x-meepshop-authorization-token-${userReq.get('x-meepshop-domain')}`,
      '',
      {
        maxAge: 0,
      },
    );
    userRes.cookie(
      'x-meepshop-authorization-token-apps.stage.meepcloud.com',
      '',
      {
        maxAge: 0,
      },
    );

    const newToken = data.token || null;

    userRes.cookie('x-meepshop-authorization-token', newToken, {
      maxAge: 86400 * 1000 * 1,
      path: '/',
      httpOnly: true,
    });

    return JSON.stringify({
      isLoginSuccess: true,
      adminStatus: data.adminStatus,
      type: data.type,
    });
  },
});
