const proxy = require('koa-better-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = koaCtx =>
  proxy(API_HOST, {
    proxyReqPathResolver: () => '/auth/login',
    userResDecorator: async (proxyRes, proxyResData, ctx) => {
      const data = JSON.parse(proxyResData.toString('utf8'));

      if (data.error) return JSON.stringify({ error: data.error });

      // TODO: Remove this when api removing set-cookie
      ctx.cookies.set(
        `x-meepshop-authorization-token-${ctx.XMeepshopDomain}`,
        '',
        {
          maxAge: 0,
        },
      );

      ctx.cookies.set('x-meepshop-authorization-token', data.token || null, {
        maxAge: 86400 * 1000 * 1,
        path: '/',
        httpOnly: true,
      });

      return JSON.stringify({ isLoginSuccess: true });
    },
  })(koaCtx);
