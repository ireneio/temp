const path = require('path');
const os = require('os');

require('isomorphic-unfetch');
const nextApp = require('next');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { publicRuntimeConfig } = require('../../next.config');
const routes = require('./routes');
const fbAuthForLine = require('./fbAuthForLine');

const { VERSION } = publicRuntimeConfig;
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
      server.use(cookieParser());
      server.use(compression());
      server.use(bodyParser.json());
      server.use((req, res, next) => {
        req.locale = req.cookies.locale;
        req.currency = req.cookies.currency;
        next();
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
      server.post('/checkout/thank-you-page/:id', (req, res) => {
        res.redirect(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
      });

      // For facebook fan page connect
      server.post('/', (req, res) => handler(req, res));

      // auth
      server.get('/fbAuthForLine', fbAuthForLine);

      server.get('*', (req, res) => handler(req, res));

      // error handler
      // eslint-disable-next-line consistent-return
      server.use((error, req, res, next) => {
        console.error(`error: ${JSON.stringify(error)} (${os.hostname()})`);
        if (res.headersSent) {
          // return to default error handler
          return next(error);
        }
        res.status(500);
        res.render('error', { error });
      });

      // listen
      server.listen(port, () => {
        console.log(`> Store ready on http://localhost:${port}`);
        resolve();
      });
    }),
);
