const path = require('path');

require('isomorphic-unfetch');
const nextApp = require('next');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nextI18NextMiddleware = require('next-i18next/middleware');

const { default: nextI18next } = require('@admin/utils/lib/i18n');

const { publicRuntimeConfig } = require('../../next.config');
const routes = require('./routes');

const { VERSION } = publicRuntimeConfig;
const port = parseInt(process.env.PORT, 10) || 14405;
const app = nextApp({
  dir: path.resolve(__dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
});
const handler = routes.getRequestHandler(app);

['unhandledRejection', 'uncaughtException'].forEach(eventName => {
  process.on(eventName, error => {
    // eslint-disable-next-line no-console
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
      server.use(cookieParser());
      server.use(compression());
      server.use(bodyParser.json());
      server.use(nextI18NextMiddleware(nextI18next));

      // routes
      server.get('/healthz', (req, res) => {
        res.status(200).end();
      });
      server.get('/version', (req, res) => {
        res.status(200).send(`Welcome to next-admin ${VERSION}`);
      });
      server.get('*', (req, res) => handler(req, res));

      // listen
      server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`> Admin ready on http://localhost:${port}`);
        resolve();
      });
    }),
);
