<img width="240" alt="meepShop logo" src="https://gc.meepcloud.com/meepshop/shop/hire/layout/553dbeef7b3649de2d24767e/images/67797-meepshop_logo_1104x372.png">

# meepShop lerna
The repo combined store, admin & mepp-ui.<br>

## How to use
### Install
```bash
$ npm run install:all
```

### Development
```bash
$ npm run dev
```
Change Domain
```bash
$ export TEST_DOMAIN=test.stage.meepcloud.com
$ npm run dev
```
Use production domain
```bash
$ export TEST_DOMAIN=test.com
$ export TEST_API=api.meepshop.com
$ npm run dev
```

### Build
```bash
$ npm run prod
```
Build with Bundle Analyzer
```bash
$ BUNDLE_ANALYZE=both npm run prod
$ BUNDLE_ANALYZE=server npm run prod
$ BUNDLE_ANALYZE=browser npm run prod
```

### Lint
```bash
$ npm run lint .
```
Watch files with lint
```bash
$ npm run lint:watch -w .
```

### Clean all building files
```bash
$ npm run clean:all
```
