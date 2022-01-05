const path = require('path');

require('dotenv').config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV !== 'production'
      ? '../.env.development'
      : '../.env.production',
  ),
});
const uuid = require('uuid/v4');
const nextApp = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { default: initialLogger } = require('@meepshop/logger');
const { default: serverLogger } = require('@meepshop/logger/lib/server');

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
  server.use(cookieParser());
  server.use(async (req, res, next) => {
    const loggerInfo = {
      id: uuid(),
      host: req.headers.host,
      userAgent: req.headers['user-agent'],
      url: req.url,
      identity:
        req.cookies.identity ||
        (() => {
          const identity = uuid();

          req.cookies.identity = identity;
          res.cookie('identity', identity, {
            expires: new Date((2 ** 31 - 1) * 1000),
          });

          return identity;
        })(),
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

    logger.debug('helmet in');
    await next();
    logger.debug('helmet out');
  });
  server.use(helmet());

  server.use(async (req, res, next) => {
    if (process.env.NEXT_PUBLIC_STORE_DOMAIN)
      req.headers.host = process.env.NEXT_PUBLIC_STORE_DOMAIN;

    await next();
  });

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

    logger.error({ error });

    if (res.headersSent) return next(error);

    res.status(500).json({ error });
  });

  // listen
  server.listen(14401, () => {
    serverLogger.info('store ready on http://localhost:14401');
  });
});
