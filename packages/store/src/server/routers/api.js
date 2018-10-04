const os = require('os');
const proxy = require('koa-better-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { PRODUCTION, API_HOST, DOMAIN } = publicRuntimeConfig;

module.exports = proxy(API_HOST, {
  proxyReqPathResolver: () => `${API_HOST}/graphql`,
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

    /* Handle token verify failed */
    if (proxyRes.statusCode === 401) {
      ctx.cookies.set('x-meepshop-authorization-token', '', {
        maxAge: 0,
      });
      return proxyResData.toString('utf8');
    }

    const XMeepshopAuthorizationToken =
      ctx.cookies.get('x-meepshop-authorization-token') || null;

    if (!XMeepshopAuthorizationToken) {
      const newToken =
        proxyRes.headers['x-meepshop-authorization-token'] || null;

      // TODO: remove this when api removing set-cookie
      ctx.cookies.set(`x-meepshop-authorization-token-${XMeepshopDomain}`, '', {
        maxAge: 0,
      });

      ctx.cookies.set('x-meepshop-authorization-token', newToken, {
        maxAge: 86400 * 1000 * 7,
        path: '/',
        httpOnly: true,
      });
    }

    if (proxyRes.statusCode >= 500) {
      console.log(
        `<ERROR> ${proxyRes.statusCode}: ${
          proxyRes.statusMessage
        } (${os.hostname()})`,
      );
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
});
