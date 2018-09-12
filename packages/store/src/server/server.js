const path = require('path');

const express = require('express');
const nextApp = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const proxy = require('express-http-proxy');

const routes = require('./routes');
const { publicRuntimeConfig } = require('../../next.config');
const {
  fbAuth,
  fbAuthForLine,
  paymentOfHitrust,
  paymentOfAllpay,
} = require('./routers');

const { PRODUCTION, VERSION, API_HOST, DOMAIN } = publicRuntimeConfig;

const PORT = 14401;
const app = nextApp({ dir: path.resolve(__dirname, '..'), dev: !PRODUCTION });
const handler = routes.getRequestHandler(app);

module.exports = app.prepare().then(
  () =>
    new Promise(resolve => {
      const server = express();
      if (PRODUCTION) {
        server.use(compression());
      }

      server.use((req, res, _next) => {
        try {
          decodeURIComponent(req.path);
        } catch (err) {
          console.log(err, req.url);
          return res.redirect(`//${req.get('Host')}`);
        }
        return _next();
      });

      server.use(bodyParser.urlencoded({ extended: false }));
      server.use(bodyParser.json());
      server.use(cookieParser());

      server.get('/healthz', (_, res) => {
        res.status(200).send(`Welcome to MeepShop-Store ${VERSION}`);
      });

      server.post(
        '/api',
        proxy(`${API_HOST}`, {
          proxyReqPathResolver: () => `${API_HOST}/graphql`,
          proxyReqOptDecorator: (proxyReqOpts, req) => {
            const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
            const XMeepshopAuthorizationToken =
              req.cookies['x-meepshop-authorization-token'] || null;
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
          userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            // /* Log error */
            // if (userRes.statusCode !== 200) {
            //   console.log(
            //     `${userRes.statusCode}(${
            //       userRes.statusMessage
            //     }): ${JSON.stringify(userReq.body)}`,
            //   );
            // } /* Log error - End */

            // /* Trace create order error */
            // try {
            //   const data = JSON.parse(proxyResData.toString('utf8'));
            //   if (data.createOrderList === null) {
            //     console.log(
            //       `#CREATE_ORDER# >> ${JSON.stringify({
            //         res: data,
            //         body: userReq.body,
            //       })}`,
            //     );
            //   }
            // } catch (err) {
            //   console.error(
            //     `Error: ${err.message}, Stack: ${JSON.stringify(err.stack)}`,
            //   );
            // } /* Trace create order error - End */
            const XMeepshopDomain = PRODUCTION ? userReq.headers.host : DOMAIN;
            const XMeepshopAuthorizationToken =
              userReq.cookies['x-meepshop-authorization-token'] || null;

            if (!XMeepshopAuthorizationToken) {
              const newToken =
                proxyRes.headers['x-meepshop-authorization-token'] || null;
              if (newToken) {
                userRes.cookie(
                  `x-meepshop-authorization-token-${XMeepshopDomain}`,
                  '',
                  { maxAge: 0 },
                );
                userRes.cookie('x-meepshop-authorization-token', newToken, {
                  maxAge: 86400 * 1000 * 7,
                  path: '/',
                  httpOnly: true,
                });
              }
            }

            return proxyResData.toString('utf8');
          },
          proxyErrorHandler: (err, _, _next) => _next(err),
        }),
      );

      server.post(
        '/signin',
        proxy(API_HOST, {
          proxyReqPathResolver: () => `${API_HOST}/auth/login`,
          proxyReqOptDecorator: (proxyReqOpts, req) => {
            const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
            return {
              ...proxyReqOpts,
              headers: {
                ...proxyReqOpts.headers,
                'Content-Type': 'application/json',
                'x-meepshop-domain': XMeepshopDomain,
              },
            };
          },
          userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
            const data = JSON.parse(proxyResData.toString('utf8'));

            if (data.error) return JSON.stringify({ error: data.error });
            console.log(data.token);
            const XMeepshopDomain = PRODUCTION ? userReq.headers.host : DOMAIN;
            userRes.cookie(
              `x-meepshop-authorization-token-${XMeepshopDomain}`,
              '',
              { maxAge: 0 },
            );
            userRes.cookie('x-meepshop-authorization-token', data.token, {
              maxAge: 86400 * 1000 * 7,
              path: '/',
              httpOnly: true,
            });
            return JSON.stringify({ isLoginSuccess: true });
          },
          proxyErrorHandler: (err, res, _next) => _next(err),
        }),
      );

      server.get('/signout', async (_, res) => {
        res.cookie('x-meepshop-authorization-token', '', { maxAge: -1 });
        res.status(200).end();
      });

      server.post('/fbAuth', fbAuth);

      server.get('/fbAuthForLine', fbAuthForLine);

      server.post('/log', (req, res) => {
        const XMeepshopDomain = req.headers.host;
        const { data } = req.body;
        console.log(`#LOG#(${XMeepshopDomain}) >>>  ${JSON.stringify(data)}`);
        res.status(200).end();
      });

      server.post('/payment/hitrust/:id', paymentOfHitrust);
      server.post('/payment/allpay', paymentOfAllpay);

      server.use(handler);

      server.use((err, req, res, next) => {
        console.log(err);
        next(err);
      });

      /* Log unexpected error */
      /* eslint-disable */
      server.use((err, _, res, next) => {
        res.status(500).end();
      }); /* eslint-enable */

      server.listen(PORT, err => {
        if (err) throw err;
        console.log(`>>> Ready on http://localhost:${PORT}`);
        resolve();
      });
    }),
);
