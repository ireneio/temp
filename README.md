<img width="240" alt="meepShop logo" src="https://gc.meepcloud.com/meepshop/shop/hire/layout/553dbeef7b3649de2d24767e/images/67797-meepshop_logo_1104x372.png">

# meepShop lerna [![CircleCI][circleci-image]][circleci-url] [![lerna][lerna-image]][lerna-url]
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

### Test
```bash
$ npm run test
```

#### Use test tool
```bash
$ make babel-test-tool TEST_SCOPE="@meepshop/test-..."
# or build all test tool
$ make babel-test-tool

$ npm run lerna -- run test --scope @meepshop/test-...
```

## Add new package
Need to add the `node_modules` of the new package to `save-cache` in `.circleci/config.yml`.

[circleci-image]: https://circleci.com/gh/meepshop/meep-lerna.svg?style=svg&circle-token=e54a3d5ceee3a9f2139527c7614c8209ea772f90
[circleci-url]: https://circleci.com/gh/meepshop/meep-lerna
[lerna-image]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[lerna-url]: https://lernajs.io/
