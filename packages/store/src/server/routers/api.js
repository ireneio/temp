const proxy = require('koa-better-http-proxy');

const { publicRuntimeConfig } = require('../../../next.config');

const { PRODUCTION, API_HOST, DOMAIN } = publicRuntimeConfig;

module.exports = koaCtx =>
  proxy(API_HOST, {
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

      // /**
      //  * Because we cannot get data if token expired (401), we have to handle
      //  * the 401 situation to request again without token and return data by
      //  * re-setting cookie by new token.
      //  */
      // if (proxyRes.statusCode === 401) {
      //   console.log('401');
      //   const response = await fetch(`${API_HOST}/graphql`, {
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-meepshop-domain': XMeepshopDomain,
      //     },
      //     credentials: 'include',
      //     body: JSON.stringify(ctx.request.body),
      //   });
      //   ctx.response.status = response.status;
      //   const newToken =
      //     response.headers.get('x-meepshop-authorization-token') || null;
      //   ctx.cookies.set('x-meepshop-authorization-token', newToken, {
      //     maxAge: 86400 * 1000 * 7,
      //     path: '/',
      //     httpOnly: true,
      //   });
      //   const data = await response.json();
      //   return JSON.stringify(data);
      // } /* Handle 401 error - End */

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
        ctx.cookies.set(
          `x-meepshop-authorization-token-${XMeepshopDomain}`,
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

      return proxyResData.toString('utf8');
    },
  })(koaCtx);
