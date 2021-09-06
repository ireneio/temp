const proxy = require('express-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { API } = publicRuntimeConfig;

module.exports = proxy(API, {
  proxyReqPathResolver: () => '/graphql',
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    /* Handle token verify failed */
    if (proxyRes.statusCode === 401) {
      userRes.cookie('x-meepshop-authorization-token', '', {
        maxAge: 0,
        httpOnly: true,
      });
      return proxyResData.toString('utf8');
    }

    if (proxyRes.statusCode >= 500)
      userReq.logger.error({
        statusCode: proxyRes.statusCode,
        statusMessage: proxyRes.statusMessage,
      });

    if (!userReq.headers['x-meepshop-authorization-token']) {
      const newToken = proxyRes.headers['x-meepshop-authorization-token'] || '';

      // TODO: remove this when api removing set-cookie
      userRes.cookie(
        `x-meepshop-authorization-token-${userReq.get('host')}`,
        '',
        {
          maxAge: 0,
          httpOnly: true,
        },
      );

      userRes.cookie('x-meepshop-authorization-token', newToken, {
        maxAge: 86400 * 1000 * 7,
        httpOnly: true,
      });
    }

    return proxyResData.toString('utf8');
  },
});
