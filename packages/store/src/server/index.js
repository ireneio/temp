const path = require('path');
const os = require('os');

require('isomorphic-unfetch');
const Koa = require('koa');
const nextApp = require('next');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const compression = require('compression');
const koaConnect = require('koa-connect');
const uuid = require('uuid/v4');

const { publicRuntimeConfig } = require('../../next.config');
const routes = require('./routes');
const { api, signin, fbAuthForLine } = require('./routers');

const { STORE_DOMAIN, VERSION } = publicRuntimeConfig;
const port = parseInt(process.env.PORT, 10) || 14401;
const app = nextApp({
  dir: path.resolve(__dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
});
const handle = routes.getRequestHandler(app, ({ req, res, route, query }) => {
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
      const server = new Koa();
      const router = new Router();

      /** router start */
      // info
      router.get('/healthz', ctx => {
        ctx.body = `Welcome to MeepShop-Store ${VERSION}`;
      });

      router.post('/log', ctx => {
        console.log(
          `#LOG#(${ctx.headers['x-meepshop-domain']}) >>>  ${JSON.stringify(
            ctx.request.body.data,
          )}`,
        );
      });

      // api
      router.post('/api', api);

      // auth
      router.post('/signin', signin('/auth/login'));
      router.post('/fbAuth', signin('/facebook/fbLogin'));
      router.get('/fbAuthForLine', fbAuthForLine);
      router.get('/signout', ctx => {
        ctx.cookies.set('x-meepshop-authorization-token', '', {
          maxAge: 0,
        });
        ctx.status = 200;
      });

      // others
      router.post('/checkout/thank-you-page/:id', ctx => {
        ctx.redirect(ctx.request.href);
      });

      // For facebook fan page connect
      router.post('/', async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        await next();
      });

      router.get('*', async (ctx, next) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        await next();
      });
      /** router end */

      server.on('error', error => {
        console.log(`Koa server onError`, error);
      });

      server.use(async (ctx, next) => {
        const id = uuid();
        const start = Date.now();

        console.log(
          `id=${id}, direction=in, info=${ctx.host} ${ctx.path} ${ctx.ip} ${
            ctx.ips
          }`,
        );
        console.log(`id=${id}, headers=${JSON.stringify(ctx.headers)}`);
        console.log(`id=${id}, body=${JSON.stringify(ctx.body)}`);
        await next();
        console.log(`id=${id}, direction=out, time=${Date.now() - start}`);
      });
      server.use(bodyParser());
      server.use(koaConnect(compression()));
      server.use(async (ctx, next) => {
        try {
          ctx.res.statusCode = 200;
          ctx.headers['x-meepshop-domain'] = STORE_DOMAIN || ctx.host;
          ctx.headers['x-meepshop-authorization-token'] =
            ctx.cookies.get('x-meepshop-authorization-token') || null;
          ctx.req.locale = ctx.cookies.get('locale');
          ctx.req.currency = ctx.cookies.get('currency');
          delete ctx.headers.cookie;
          await next();
        } catch (error) {
          console.log(`KoaCatch ${error.message} (${os.hostname()})`);
          throw error;
        }
      });

      server.use(router.routes());

      server.listen(port, () => {
        console.log(`> Store ready on http://localhost:${port}`);
        resolve();
      });
    }),
);
