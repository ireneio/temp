<img width="240" alt="meepShop logo" src="https://gc.meepcloud.com/meepshop/shop/hire/layout/553dbeef7b3649de2d24767e/images/67797-meepshop_logo_1104x372.png">

# meepShop lerna [![CircleCI][circleci-image]][circleci-url] [![lerna][lerna-image]][lerna-url]

The repo combined store, admin & mepp-ui.

## How to use

| command     | root only | example                   |
| ----------- | :-------: | ------------------------- |
| install:all |    ✅     | yarn install:all          |
| lint        |    ✅     | yarn lint .               |
| lint:watch  |    ✅     | yarn lint:watch .         |
| release     |    ✅     | yarn release              |
| dev         |           | yarn dev @meepshop/store  |
| prod        |           | yarn prod @meepshop/store |
| clean       |           | yarn clean                |
| test        |           | yarn test                 |

> If the command is not root only, you can use like: `yarn lerna run dev --scope @meepshop/store`.
> Using the command with `--stream` to print all the information is recommended.

## store

| command | example                                      |
| ------- | -------------------------------------------- |
| start   | yarn lerna run start --scope @meepshop/store |

###### dev

| env                         | example                                                                                             | note                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- |
| STORE_DOMAIN                | STORE_DOMAIN=test.com yarn dev @meepshop/store                                                      |                                       |
| API_HOST, EXTERNAL_API_HOST | API_HOST=https://api.meepshop.tw EXTERNAL_API_HOST=https://api.meepshop.tw yarn dev @meepshop/store |                                       |
| BUNDLE_ANALYZE              | BUNDLE_ANALYZE=both yarn dev @meepshop/store                                                        | It can be `both`, `server`, `browser` |

## meep-ui

| command        | example                                                 |
| -------------- | ------------------------------------------------------- |
| storybook      | yarn lerna run storybook --scope @meepshop/meep-ui      |
| storybook:docs | yarn lerna run storybook:docs --scope @meepshop/meep-ui |

> You can see [README.md](./packages/meep-ui/README.md) to leran how to use `storybook`.

[circleci-image]: https://circleci.com/gh/meepshop/meep-lerna.svg?style=svg&circle-token=e54a3d5ceee3a9f2139527c7614c8209ea772f90
[circleci-url]: https://circleci.com/gh/meepshop/meep-lerna
[lerna-image]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[lerna-url]: https://lernajs.io/
