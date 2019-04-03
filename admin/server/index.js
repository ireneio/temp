const path = require('path');
const os = require('os');
const nextApp = require('next');
const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('@admin/utils/src/i18n');

const { publicRuntimeConfig } = require('./next.config');
const { api, signin } = require('./routers');
const routes = require('./routes');

const { PRODUCTION, VERSION, API_DOMAIN } = publicRuntimeConfig;
const port = parseInt(process.env.PORT, 10) || 14405;
const app = nextApp({
  dev: !PRODUCTION,
  dir: path.resolve(__dirname, './src'),
});
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  // middleware
  server.use(cookieParser());
  server.use(compression());
  server.use(bodyParser.json());
  server.use(nextI18NextMiddleware(nextI18next));
  server.use((req, res, next) => {
    try {
      res.status(200);
      req.headers['x-meepshop-domain'] = API_DOMAIN;
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
  server.listen(port, err => {
    if (err) throw err;
    console.log(`>Admin ready on http://localhost:${port}`);
  });
});
