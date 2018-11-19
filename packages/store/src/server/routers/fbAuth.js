const proxy = require('koa-better-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { PRODUCTION, API_HOST, DOMAIN } = publicRuntimeConfig;

module.exports = koaCtx =>
  proxy(API_HOST, {
    proxyReqPathResolver: () => `${API_HOST}/facebook/fbLogin`,
    proxyReqOptDecorator: (proxyReqOpts, ctx) => {
      const XMeepshopDomain = PRODUCTION ? ctx.host : DOMAIN;
      const XMeepshopAuthorizationToken =
        ctx.cookies.get('x-meepshop-authorization-token') || null;
      return {
        ...proxyReqOpts,
        headers: {
          ...proxyReqOpts.headers,
          'Content-Type': 'application/json',
          'x-meepshop-domain': XMeepshopDomain,
          'x-meepshop-authorization-token': XMeepshopAuthorizationToken,
        },
      };
    },
    userResDecorator: async (proxyRes, proxyResData, ctx) => {
      const XMeepshopDomain = PRODUCTION ? ctx.host : DOMAIN;
      const XMeepshopAuthorizationToken =
        proxyRes.headers['x-meepshop-authorization-token'] || null;

      // TODO: Remove this when api removing set-cookie
      ctx.cookies.set(`x-meepshop-authorization-token-${XMeepshopDomain}`, '', {
        maxAge: 0,
      });

      ctx.cookies.set(
        'x-meepshop-authorization-token',
        XMeepshopAuthorizationToken,
        {
          maxAge: 86400 * 1000 * 1,
          path: '/',
          httpOnly: true,
        },
      );

      return proxyResData.toString('utf8');
    },
  })(koaCtx);
