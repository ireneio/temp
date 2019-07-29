const proxy = require('express-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = redirectPath =>
  proxy(API_HOST, {
    proxyReqPathResolver: () => redirectPath,
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      let newToken;

      if (redirectPath === '/auth/login') {
        const data = JSON.parse(proxyResData.toString('utf8'));

        if (data.error) return JSON.stringify({ error: data.error });

        newToken = data.token || '';
      } else {
        newToken = proxyRes.headers['x-meepshop-authorization-token'] || '';
      }

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

      if (redirectPath === '/auth/login')
        return JSON.stringify({ isLoginSuccess: true });

      return proxyResData.toString('utf8');
    },
  });
