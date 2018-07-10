<img width="240" alt="meepShop logo" src="https://gc.meepcloud.com/meepshop/shop/hire/layout/553dbeef7b3649de2d24767e/images/67797-meepshop_logo_1104x372.png?w=1440">

# meepShop Store
Improve SEO with server-side rendering by Next.js.<br>

## How to use
### Development
```bash
$ npm run dev
```
or use [Chrome Node Debbuger](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)
```bash
$ node --inspect src/server/server.js
```
### Build
```js
$ npm run build
```
Build with Bundle Analyzer
```bash
$ BUNDLE_ANALYZE=both npm run build
$ BUNDLE_ANALYZE=server npm run build
$ BUNDLE_ANALYZE=browser npm run build
```
### Production
```bash
$ npm run start
```

## Configurations
If you want to use other api host or testing domain, change `API_HOST`, `EXTERNAL_API_HOST` and `DOMAIN` below.

**/next.config.js**
```js
...

  publicRuntimeConfig: {
    PRODUCTION: production,
    VERSION: process.env.REPO_VERSION || +new Date(),
    API_HOST: production ? 'http://meepshop-api:15265' : `${protocal}://api.stage.meepcloud.com`,
    EXTERNAL_API_HOST: production ? `${protocal}://${process.env.API_HOST}` : `${protocal}://api.stage.meepcloud.com`,
    DOMAIN: 'bellatest.stage.meepcloud.com',
  },
  
...
```