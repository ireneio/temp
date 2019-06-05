const proxy = require('koa-better-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = redirectPath => koaCtx =>
  proxy(API_HOST, {
    proxyReqPathResolver: () => redirectPath,
    userResDecorator: async (proxyRes, proxyResData, ctx) => {
      let newToken;

      if (redirectPath === '/auth/login') {
        const data = JSON.parse(proxyResData.toString('utf8'));

        if (data.error) return JSON.stringify({ error: data.error });

        newToken = data.token || null;
      } else {
        newToken = proxyRes.headers['x-meepshop-authorization-token'] || null;
      }

      // TODO: Remove this when api removing set-cookie
      ctx.cookies.set(
        `x-meepshop-authorization-token-${ctx.headers['x-meepshop-domain']}`,
        '',
        {
          maxAge: 0,
        },
      );

      ctx.cookies.set('x-meepshop-authorization-token', newToken, {
        maxAge: 86400 * 1000 * 1,
        path: '/',
        httpOnly: true,
      });

      if (redirectPath === '/auth/login')
        return JSON.stringify({ isLoginSuccess: true });

      return proxyResData.toString('utf8');
    },
  })(koaCtx);
