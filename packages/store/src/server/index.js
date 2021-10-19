const path = require('path');
const uuid = require('uuid/v4');
const nextApp = require('next');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { default: initialLogger } = require('@meepshop/logger');
const { default: serverLogger } = require('@meepshop/logger/lib/server');

const { publicRuntimeConfig } = require('../../next.config');
const api = require('./routers/api');
const signin = require('./routers/signin');
const landingPageAccessToken = require('./routers/landingPageAccessToken');
const mapCookiesToHeaders = require('./mapCookiesToHeaders');

const { STORE_DOMAIN } = publicRuntimeConfig;
const app = nextApp({
  dir: path.resolve(__dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
});
const handler = app.getRequestHandler();

[
  'unhandledRejection',
  'uncaughtException',
  'beforeExit',
  'exit',
  'SIGTERM',
  'SIGINT',
].forEach(eventName => {
  process.on(eventName, error => {
    serverLogger.error({
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
    const loggerInfo = {
      id: uuid(),
      host: req.headers.host,
      userAgent: req.headers['user-agent'],
      url: req.url,
    };
    const logger = initialLogger(loggerInfo);

    req.loggerInfo = loggerInfo;
    req.logger = logger;
    logger.debug({
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

  // FIXME: for Loadbalancer
  server.get('/healthz', (req, res) => {
    const { logger } = req;

    logger.warn('should use /api/healthz');
    res.status(200).end();
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

  // FIXME: should remove
  server.post('/checkout/thank-you-page/:id', (req, res) => {
    const { logger } = req;

    logger.warn('should use /api/checkout/thank-you-page/:id');
    res.redirect(`https://${req.get('host')}${req.originalUrl}`);
  });

  server.all('*', (req, res) => handler(req, res));

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
    serverLogger.info('store ready on http://localhost:14401');
  });
});
