const path = require('path');
const os = require('os');

require('isomorphic-unfetch');
const nextApp = require('next');
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nextI18NextMiddleware = require('next-i18next/middleware');

const { default: nextI18next } = require('@admin/utils/lib/i18n');

const { publicRuntimeConfig } = require('../../next.config');
const { api, signin } = require('./routers');
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
      server.use((req, res, next) => {
        try {
          res.status(200);
          req.headers['x-meepshop-domain'] =
            process.env.API_DOMAIN || 'admin.stage.meepcloud.com';
          req.headers['x-meepshop-authorization-token'] =
            req.cookies['x-meepshop-authorization-token'] || null;
          next();
        } catch (error) {
          console.log(`Server Error ${error.message} (${os.hostname()})`);
          throw error;
        }
      });

      // routes
      server.get('/healthz', (req, res) => {
        res.send(`Welcome to MeepShop-Admin ${VERSION}`);
      });
      server.post('/signin', signin);
      server.get('/signout', (req, res) => {
        res
          .status(200)
          .cookie('x-meepshop-authorization-token', '', {
            maxAge: 0,
          })
          .redirect('/login');
      });
      server.all(/^\/api/, api);
      server.get('*', (req, res) => handler(req, res));

      // listen
      server.listen(port, () => {
        console.log(`> Admin ready on http://localhost:${port}`);
        resolve();
      });
    }),
);
