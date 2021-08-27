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
const helmet = require('helmet');
const uaParser = require('ua-parser-js');

const { default: logger } = require('@meepshop/utils/lib/logger');

const { publicRuntimeConfig } = require('../../next.config');
const routes = require('./routes');
const api = require('./routers/api');
const signin = require('./routers/signin');
const fbAuthForLine = require('./routers/fbAuthForLine');
const landingPageAccessToken = require('./routers/landingPageAccessToken');
const mapCookiesToHeaders = require('./mapCookiesToHeaders');

const { VERSION, STORE_DOMAIN } = publicRuntimeConfig;
const app = nextApp({
  dir: path.resolve(__dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
});
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  let { page } = route;

  if (route.name === 'pages' && query.pId) page = '/product';

  app.render(req, res, page, query);
});

[
  'unhandledRejection',
  'uncaughtException',
  'beforeExit',
  'exit',
  'SIGTERM',
  'SIGINT',
].forEach(eventName => {
  process.on(eventName, error => {
    logger.info(
      `${eventName} => ${JSON.stringify({
        msg: error.message || error,
        stk: error.stack,
      })}`,
    );

    if (['exit', 'SIGTERM', 'SIGINT'].includes(eventName)) process.exit(error);
  });
});

app.prepare().then(() => {
  const server = express();

  // middleware
  server.use(async (req, res, next) => {
    const id = uuid();
    const start = Date.now();

    req.logId = id;

    debug(`id=${id}, info=${req.get('host')} ${req.path} ${req.ip} ${req.ips}`);
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
    debug(`id=${req.logId}, helmet=in`);
    await next();
    debug(`id=${req.logId}, helmet=out`);
  });
  server.use(helmet());

  server.use(async (req, res, next) => {
    if (STORE_DOMAIN) req.headers.host = STORE_DOMAIN;

    await next();
  });

  // routes
  server.get('/healthz', (req, res) => {
    res.status(200).end();
  });
  server.get('/version', (req, res) => {
    const {
      browser,
      engine,
      os: _os,
      device: { type = 'desktop', model = '', vendor = 'unknown' },
    } = uaParser(req.headers['user-agent']);
    res.status(200).send(`
          <header>Welcome to next-store ${VERSION}</header>
          <main>
            Your information:
            <ul>
              <li>Browser: ${browser.name}(${browser.version})</li>
              <li>Engine: ${engine.name}</li>
              <li>OS: ${_os.name}(${_os.version})</li>
              <li>Device: ${type} - ${model}(${vendor})</li>
            </ul>
          </main>
        `);
  });
  server.post('/log', (req, res) => {
    logger.info(`#LOG#(${req.get('host')}) >>>  ${JSON.stringify(req.body)}`);
    res.end();
  });

  // api
  server.post('/api/graphql', mapCookiesToHeaders, api);
  server.post('/api/landing-page/graphql', mapCookiesToHeaders, api);

  // auth
  server.post('/api/auth/login', mapCookiesToHeaders, signin('/auth/login'));
  server.post(
    '/api/auth/fbLogin',
    mapCookiesToHeaders,
    signin('/facebook/fbLogin'),
  );
  server.get('/fbAuthForLine', mapCookiesToHeaders, fbAuthForLine);
  server.post('/api/auth/logout', (req, res) => {
    res.cookie('x-meepshop-authorization-token', '', {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(200).end();
  });
  server.post(
    '/auth/landing_page/access_token',
    mapCookiesToHeaders,
    landingPageAccessToken,
  );

  // For facebook fan page connect
  server.post('/', (req, res) => handler(req, res));

  // ecpay
  server.post('/pages/:path', (req, res) => handler(req, res));
  server.post('/products', (req, res) => handler(req, res));

  // others
  server.post('/checkout/thank-you-page/:id', (req, res) => {
    res.redirect(`https://${req.get('host')}${req.originalUrl}`);
  });

  server.get('*', (req, res) => handler(req, res));

  // error handler
  // eslint-disable-next-line consistent-return
  server.use((error, req, res, next) => {
    logger.error(`error: ${JSON.stringify(error)} (${os.hostname()})`);
    if (res.headersSent) {
      // return to default error handler
      return next(error);
    }
    res.status(500).json({ error });
  });

  // listen
  server.listen(14401, () => {
    logger.info('> Store ready on http://localhost:14401');
  });
});
