const path = require('path');

const Koa = require('koa');
const nextApp = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const compression = require('compression');
const koaConnect = require('koa-connect');

const { publicRuntimeConfig } = require('../../next.config');
const routes = require('./routes');
const { api, signin, fbAuth, fbAuthForLine, log } = require('./routers');

const { PRODUCTION, VERSION } = publicRuntimeConfig;

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

const port = parseInt(process.env.PORT, 10) || 14401;
const app = nextApp({ dir: path.resolve(__dirname, '..'), dev: !PRODUCTION });
const handle = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  let { page } = route;
  if (route.name === 'pages' && query.pId) {
    page = '/product';
  }
  app.render(req, res, page, query);
});

module.exports = app.prepare().then(
  () =>
    new Promise(resolve => {
      const server = new Koa();
      const router = new Router();

      server.use(bodyParser());
      server.use(koaConnect(compression()));

      router.get('/healthz', ctx => {
        ctx.status = 200;
        ctx.body = `Welcome to MeepShop-Store ${VERSION}`;
      });

      router.post('/api', api);
      router.post('/signin', signin);
      router.get('/signout', ctx => {
        ctx.cookies.set('x-meepshop-authorization-token', '', {
          maxAge: 0,
        });
        ctx.status = 200;
      });

      router.post('/fbAuth', fbAuth);
      router.get('/fbAuthForLine', fbAuthForLine);

      router.post('/log', log);

      router.post('/checkout/thank-you-page/:id', ctx => {
        ctx.redirect(ctx.request.href);
      });

      router.get('*', async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        await next();
      });

      server.use(router.routes());

      server.listen(port, () => {
        console.log(`*** Ready on http://localhost:${port} ***`);
        resolve();
      });
    }),
);
