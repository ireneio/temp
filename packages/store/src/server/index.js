const path = require('path');

require('isomorphic-unfetch');
const nextApp = require('next');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const uaParser = require('ua-parser-js');

const { default: initializeLogger } = require('@meepshop/logger');
const {
  default: loggerMiddleware,
} = require('@meepshop/logger/lib/middleware');

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
const handler = routes.getRequestHandler(app);

[
  'unhandledRejection',
  'uncaughtException',
  'beforeExit',
  'exit',
  'SIGTERM',
  'SIGINT',
].forEach(eventName => {
  const logger = initializeLogger();

  process.on(eventName, error => {
    logger.info({
      eventName,
      message: error.message || error,
      stack: error.stack,
    });

    if (['exit', 'SIGTERM', 'SIGINT'].includes(eventName)) process.exit(error);
  });
});

app.prepare().then(() => {
  const server = express();

  // middleware
  server.use(async (req, res, next) => {
    const logger = initializeLogger();

    req.logger = logger;
    logger.debug({
      host: req.get('host'),
      path: req.path,
      ip: req.ip,
      ips: req.ips,
      headers: req.headers,
      message: 'body parser in',
    });
    await next();
    logger.debug('body parser out');
  });
  server.use(bodyParser.json());
  server.use(async (req, res, next) => {
    const { logger } = req;

    logger.debug('cookie parser in');
    await next();
    logger.debug('cookie parser out');
  });
  server.use(cookieParser());
  server.use(async (req, res, next) => {
    const { logger } = req;

    logger.debug('compression in');
    await next();
    logger.debug('compression out');
  });
  server.use(compression());
  server.use(async (req, res, next) => {
    const { logger } = req;

    logger.debug('helmet in');
    await next();
    logger.debug('helmet out');
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
  server.post('/api/log', loggerMiddleware);

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
    const { logger } = req;

    logger.error(error);

    if (res.headersSent) return next(error);

    res.status(500).json({ error });
  });

  // listen
  server.listen(14401, () => {
    initializeLogger().info('store ready on http://localhost:14401');
  });
});
