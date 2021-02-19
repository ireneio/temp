const path = require('path');

require('isomorphic-unfetch');
const nextApp = require('next');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const uaParser = require('ua-parser-js');
const { default: nextI18NextMiddleware } = require('next-i18next/middleware');

const { default: nextI18next } = require('@meepshop/utils/lib/i18n');
const { default: logger } = require('@meepshop/utils/lib/logger');

const { publicRuntimeConfig } = require('../../next.config');

const { VERSION } = publicRuntimeConfig;
const port = parseInt(process.env.PORT, 10) || 14405;
const app = nextApp({
  dir: path.resolve(__dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
});
const handler = app.getRequestHandler();

['unhandledRejection', 'uncaughtException'].forEach(eventName => {
  process.on(eventName, error => {
    logger.info(
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
      server.use(helmet());

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
          <header>Welcome to next-admin ${VERSION}</header>
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
      server.get('*', (req, res) => handler(req, res));

      // listen
      server.listen(port, () => {
        logger.info(`> Admin ready on http://localhost:${port}`);
        resolve();
      });
    }),
);
