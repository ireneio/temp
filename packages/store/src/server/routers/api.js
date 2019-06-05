const os = require('os');

const proxy = require('koa-better-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { API_HOST } = publicRuntimeConfig;

module.exports = koaCtx =>
  proxy(API_HOST, {
    proxyReqPathResolver: () => '/graphql',
    userResDecorator: async (proxyRes, proxyResData, ctx) => {
      /* Handle token verify failed */
      if (proxyRes.statusCode === 401) {
        ctx.cookies.set('x-meepshop-authorization-token', '', {
          maxAge: 0,
        });
        return proxyResData.toString('utf8');
      }

      if (proxyRes.statusCode >= 500)
        console.log(
          `<ERROR> ${proxyRes.statusCode}: ${
            proxyRes.statusMessage
          } (${os.hostname()})`,
        );

      if (!ctx.headers['x-meepshop-authorization-token']) {
        const newToken =
          proxyRes.headers['x-meepshop-authorization-token'] || null;

        // TODO: remove this when api removing set-cookie
        ctx.cookies.set(
          `x-meepshop-authorization-token-${ctx.headers['x-meepshop-domain']}`,
          '',
          {
            maxAge: 0,
          },
        );

        ctx.cookies.set('x-meepshop-authorization-token', newToken, {
          maxAge: 86400 * 1000 * 7,
          path: '/',
          httpOnly: true,
        });
      }

      try {
        JSON.parse(proxyResData.toString('utf8'));
      } catch (err) {
        console.log(
          `<< /api >> ${err.message} - ${proxyResData.toString('utf8')}`,
        );
      }

      return proxyResData.toString('utf8');
    },
  })(koaCtx);
