const proxy = require('express-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { API } = publicRuntimeConfig;

module.exports = redirectPath =>
  proxy(API, {
    proxyReqPathResolver: () => redirectPath,
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      const newToken = proxyRes.headers['x-meepshop-authorization-token'] || '';

      // TODO: Remove this when api removing set-cookie
      userRes.cookie(
        `x-meepshop-authorization-token-${userReq.get('host')}`,
        '',
        {
          maxAge: 0,
          httpOnly: true,
        },
      );

      userRes.cookie('x-meepshop-authorization-token', newToken, {
        maxAge: 86400 * 1000 * 1,
        httpOnly: true,
      });

      return proxyResData.toString('utf8');
    },
  });
