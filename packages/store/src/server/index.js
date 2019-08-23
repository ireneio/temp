/* eslint-disable no-console */

const path = require('path');
const os = require('os');

require('isomorphic-unfetch');
const nextApp = require('next');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('next-store:server');
const uuid = require('uuid/v4');
const { default: nextI18NextMiddleware } = require('next-i18next/middleware');

const { default: nextI18next } = require('@store/utils/lib/i18n');

const { publicRuntimeConfig } = require('../../next.config');
const routes = require('./routes');
const { api, signin, fbAuthForLine } = require('./routers');

const { VERSION, STORE_DOMAIN } = publicRuntimeConfig;
const port = parseInt(process.env.PORT, 10) || 14401;
const app = nextApp({
  dir: path.resolve(__dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
});
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  let { page } = route;

  if (route.name === 'pages' && query.pId) page = '/product';

  app.render(req, res, page, query);
});

['unhandledRejection', 'uncaughtException'].forEach(eventName => {
  process.on(eventName, error => {
    console.log(
      `${eventName} => ${JSON.stringify({
        msg: error.message,
        stk: error.stack,
      })}`,
    );
  });
});

module.exports = app.prepare().then(
  () =>
    new Promise(resolve => {
      const server = express();

      // middleware
      server.use(async (req, res, next) => {
        const id = uuid();
        const start = Date.now();

        req.logId = id;

        debug(
          `id=${id}, info=${req.get('host')} ${req.path} ${req.ip} ${req.ips}`,
        );
        debug(`id=${id}, headers=${JSON.stringify(req.headers)}`);
        debug(`id=${id}, bodyParser=in`);
        await next();
        debug(`id=${id}, bodyParser=out`);
        debug(`id=${id}, time=${Date.now() - start}`);
      });
      server.use(bodyParser.json());
      server.use(async (req, res, next) => {
        debug(`id=${req.logId}, cookieParser=in`);
        await next();
        debug(`id=${req.logId}, cookieParser=out`);
      });
      server.use(cookieParser());
      server.use(async (req, res, next) => {
        debug(`id=${req.logId}, compression=in`);
        await next();
        debug(`id=${req.logId}, compression=out`);
      });
      server.use(compression());
      server.use(async (req, res, next) => {
        debug(`id=${req.logId}, nextI18next=in`);
        await next();
        debug(`id=${req.logId}, nextI18next=out`);
      });
      server.use(nextI18NextMiddleware(nextI18next));
      server.use(async (req, res, next) => {
        debug(`id=${req.logId}, modifier=in`);
        await next();
        debug(`id=${req.logId}, modifier=out`);
      });
      server.use((req, res, next) => {
        try {
          if (STORE_DOMAIN) req.headers.host = STORE_DOMAIN;
          req.headers['x-meepshop-domain'] = req.get('host');
          req.headers['x-meepshop-authorization-token'] =
            req.cookies['x-meepshop-authorization-token'] || null;
          req.currency = req.cookies.currency;
          delete req.cookies;
          next();
        } catch (error) {
          console.log(`Server Error ${error.message} (${os.hostname()})`);
          throw error;
        }
      });
      server.use(async (req, res, next) => {
        debug(`id=${req.logId}, router=in`);
        await next();
        debug(`id=${req.logId}, router=out`);
      });

      // routes
      server.get('/healthz', (req, res) => {
        res.status(200).end();
      });
      server.get('/version', (req, res) => {
        res.status(200).send(`Welcome to next-store ${VERSION}`);
      });
      server.post('/log', req => {
        console.log(
          `#LOG#(${req.get('host')}) >>>  ${JSON.stringify(req.body.data)}`,
        );
      });

      // api
      server.post('/api', api);

      // auth
      server.post('/signin', signin('/auth/login'));
      server.post('/fbAuth', signin('/facebook/fbLogin'));
      server.get('/fbAuthForLine', fbAuthForLine);
      server.get('/signout', (req, res) => {
        res.cookie('x-meepshop-authorization-token', '', {
          maxAge: 0,
          httpOnly: true,
        });
        res.status(200).end();
      });

      // For facebook fan page connect
      server.post('/', (req, res) => handler(req, res));

      // others
      server.post('/checkout/thank-you-page/:id', (req, res) => {
        res.redirect(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
      });

      server.get('*', (req, res) => handler(req, res));

      // error handler
      // eslint-disable-next-line consistent-return
      server.use((error, req, res, next) => {
        console.error(`error: ${JSON.stringify(error)} (${os.hostname()})`);
        if (res.headersSent) {
          // return to default error handler
          return next(error);
        }
        res.status(500).json({ error });
      });

      // listen
      server.listen(port, () => {
        console.log(`> Store ready on http://localhost:${port}`);
        resolve();
      });
    }),
);
