const path = require('path');

const express = require('express');
const nextApp = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const fetch = require('isomorphic-unfetch');

const routes = require('./routes');
const { publicRuntimeConfig } = require('../../next.config');
const { paymentOfHitrust, paymentOfAllpay } = require('./api');

const { PRODUCTION, VERSION, API_HOST, DOMAIN } = publicRuntimeConfig;

const PORT = 14401;
const app = nextApp({ dir: path.resolve(__dirname, '..'), dev: !PRODUCTION });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  let { page } = route;
  if (route.name === 'pages' && query.pId) {
    page = '/product';
  }
  app.render(req, res, page, query);
});

module.exports = app.prepare().then(
  () =>
    new Promise(resolve => {
      const server = express();
      if (PRODUCTION) {
        server.use(compression());
      }
      server.use(bodyParser.urlencoded({ extended: false }));
      server.use(bodyParser.json());
      server.use(cookieParser());

      server.get('/healthz', (_, res) => {
        res.status(200).send(`Welcome to MeepShop-Store ${VERSION}`);
      });

      server.post('/signin', async (req, res, next) => {
        const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
        const XMeepshopDomainToken =
          req.cookies['x-meepshop-authorization-token'];
        try {
          const response = await fetch(`${API_HOST}/auth/login`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'x-meepshop-domain': XMeepshopDomain,
              'x-meepshop-authorization-token': XMeepshopDomainToken,
            },
            credentials: 'include',
            body: JSON.stringify(req.body),
          }).catch(e => ({ e }));

          if (response.e) return next(response.e);

          let data = {};
          if (response.status === 200) {
            data = await response.json();
          } else {
            throw new Error(
              `${response.status}: ${response.statusText}(signin)`,
            );
          }
          if (data.error) {
            return res.json({ error: data.error });
          }
          res.cookie('x-meepshop-authorization-token', data.token, {
            expires: new Date(Date.now() + 86380000 * 7),
            httpOnly: true,
          });
          return res.json({ isLoginSuccess: true });
        } catch (error) {
          console.log(`Error: ${error.message}`);
          return res.json({ error: error.message });
        }
      });

      server.post('/signout', async (req, res, next) => {
        const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
        try {
          const response = await fetch(`${API_HOST}/auth/logout`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'x-meepshop-domain': XMeepshopDomain,
            },
            credentials: 'include',
          }).catch(e => ({ e }));

          if (response.e) return next(response.e);

          let data;
          if (response.status === 200) {
            data = { msg: 'logout success' };
          } else {
            data = { msg: 'logout fails.' };
            throw new Error(
              `${response.status}: ${response.statusText}(signout)`,
            );
          }
          res.cookie('x-meepshop-authorization-token', '', { httpOnly: true });
          return res.json(data);
        } catch (error) {
          console.log(`Error: ${error.message}`);
          return res.json({ error: error.message });
        }
      });

      server.post('/fbAuth', async (req, res, next) => {
        const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
        const XMeepshopDomainToken =
          req.cookies['x-meepshop-authorization-token'];
        try {
          const response = await fetch(
            `${API_HOST}/facebook/fbLogin?domain=${encodeURIComponent(
              XMeepshopDomain,
            )}`,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'x-meepshop-domain': XMeepshopDomain,
                'x-meepshop-authorization-token': XMeepshopDomainToken,
              },
              credentials: 'include',
              body: JSON.stringify(req.body),
            },
          ).catch(e => ({ e }));

          if (response.e) return next(response.e);

          let data;
          if (response.status === 200) {
            data = await response.json();
          } else {
            throw new Error(
              `${response.status}: ${response.statusText}(fbAuth)`,
            );
          }
          res.cookie(
            'x-meepshop-authorization-token',
            response.headers.get('x-meepshop-authorization-token'),
            { expires: new Date(Date.now() + 86380000 * 7), httpOnly: true },
          );
          return res.json(data);
        } catch (error) {
          console.log(`Error: ${error.message}`);
          return res.json({ error: error.message });
        }
      });

      server.get('/fbAuthForLine', async (req, res, next) => {
        try {
          /* Get FB app secret */
          const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
          const XMeepshopDomainToken =
            req.cookies['x-meepshop-authorization-token'];
          const query = `
          query Root {
            getAppLoginList {
              data {
                appId
                appSecret
              }
            }
          }
        `;
          const response = await fetch(`${API_HOST}/graphql`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'x-meepshop-domain': XMeepshopDomain,
            },
            credentials: 'include',
            body: JSON.stringify({ query }),
          }).catch(e => ({ e }));

          if (response.e) return next(response.e);

          let data;
          if (response.status === 200) {
            data = await response.json();
          } else {
            data = await response.json();
            throw new Error(
              `${response.status}: ${response.statusText}(api) ${
                data.errors[0].message
              }`,
            );
          }
          /* Get FB app secret - End */
          const appId =
            data &&
            data.data.getAppLoginList &&
            data.data.getAppLoginList.data.length > 0 &&
            data.data.getAppLoginList.data[0].appId;
          const appSecret =
            data &&
            data.data.getAppLoginList &&
            data.data.getAppLoginList.data.length > 0 &&
            data.data.getAppLoginList.data[0].appSecret;

          if (!appSecret) {
            throw new Error('No app secret.');
          }

          /* Handle error */
          const errorArr = req.url.match(/(error)=(.*?)(?=&)/gm);
          const error = errorArr && errorArr[0].split('=')[1];
          const errorReasonArr = req.url.match(/(error_reason)=(.*?)(?=&)/gm);
          const errorReason = errorReasonArr && errorReasonArr[0].split('=')[1];

          if (error) {
            throw new Error(`${error}: ${errorReason}`);
          }
          /* Handle error - End */

          /* Parse code & state */
          const codeArr = req.url.match(/code=(.*?)(?=&)/gm);
          const code = codeArr && codeArr[0].split('=')[1];
          const stateArr = req.url.match(/&(.*?)$/gm);
          const state = stateArr && stateArr[0].split('=')[1];

          if (!state.match(/meepShopNextStore/gm)) {
            throw new Error('State is not matched!');
          }

          const fbApi = `https://graph.facebook.com/v3.0/oauth/access_token?client_id=${appId}&redirect_uri=https://${XMeepshopDomain}/fbAuthForLine&client_secret=${appSecret}&code=${code}`;
          const responseFromFB = await fetch(fbApi, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          }).catch(e => ({ e }));

          if (response.e) return next(response.e);

          let dataFromFB;
          if (responseFromFB.status === 200) {
            dataFromFB = await responseFromFB.json();
          } else {
            dataFromFB = await responseFromFB.json();
            throw new Error(
              `${responseFromFB.status}: ${responseFromFB.statusText}`,
            );
          }

          const responseApi = await fetch(
            `${API_HOST}/facebook/fbLogin?domain=${encodeURIComponent(
              XMeepshopDomain,
            )}`,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                'x-meepshop-domain': XMeepshopDomain,
                'x-meepshop-authorization-token': XMeepshopDomainToken,
              },
              credentials: 'include',
              body: JSON.stringify({ accessToken: dataFromFB.access_token }),
            },
          ).catch(e => ({ e }));

          if (response.e) return next(response.e);

          let dataApi;
          if (responseApi.status === 200) {
            dataApi = await responseApi.json();
          } else {
            throw new Error(`${responseApi.status}: ${responseApi.statusText}`);
          }

          if (dataApi.code === 200 || dataApi.code === 201) {
            res.cookie(
              'x-meepshop-authorization-token',
              responseApi.headers.get('x-meepshop-authorization-token'),
              {
                expires: new Date(Date.now() + 86380000 * 7),
                httpOnly: true,
              },
            );
          } else {
            throw new Error(`${dataApi.code}-${dataApi._error}`);
          }

          if (state.match(/cart/gm)) {
            return res.redirect(302, '/checkout');
          }
          return res.redirect(302, '/login');
        } catch (error) {
          console.log(`Error: ${error.message}`);
          return res.redirect(302, `/login?error=${error.message}`);
        }
      });

      server.post('/api', async (req, res, next) => {
        const XMeepshopDomain = PRODUCTION ? req.headers.host : DOMAIN;
        const XMeepshopDomainToken =
          req.cookies['x-meepshop-authorization-token'];

        try {
          const response = await fetch(`${API_HOST}/graphql`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'x-meepshop-domain': XMeepshopDomain,
              'x-meepshop-authorization-token': XMeepshopDomainToken,
              'User-Agent': req.headers['user-agent'],
            },
            credentials: 'include',
            body: JSON.stringify(req.body),
          }).catch(e => ({ e }));

          if (response.e) return next(response.e);

          const data = await response.json();

          if (response.status !== 200)
            throw new Error(
              `${response.status}: ${response.statusText}(graphql) ${
                data.errors[0].message
              } ==> ${JSON.stringfy({
                domian: XMeepshopDomain,
                token: XMeepshopDomainToken,
                body: req.body,
              })}`,
            );

          if (!XMeepshopDomainToken) {
            res.cookie(
              'x-meepshop-authorization-token',
              response.headers.get('x-meepshop-authorization-token'),
              { expires: new Date(Date.now() + 86380000 * 7), httpOnly: true },
            );
          }

          /** FIXME: trace createOrderList is null and errors is null. */
          if (data.createOrderList === null && !data.errors)
            console.log(
              `#CREATE_ORDER#(${XMeepshopDomain}) >>>  ${JSON.stringify({
                ...req.body,
              })}`,
            );
          /** [end] */

          return res.json(data);
        } catch (error) {
          console.log(`Error: ${error.message}`);
          return res.json({ error: error.message });
        }
      });

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
