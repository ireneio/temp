[![logo][logo-image]][logo-url]

# @meepshop/front-end [![circlecI][circleci-image]][circleci-url] [![lerna][lerna-image]][lerna-url]

This project use `lerna` to manage `@store/*` and `@admin/*`.

#### scripts

- `clean`: Remove the building files and node_modules.
- `dev`: Run `dev` mode
- `preinstall`, `postinstall`: Patched packages.
- `install:all`: Install the all packages.
- `lint`, `lint:watch`: Run lint.
- `prod`: Run `prod` mode.
- `release`: Release the new version.
- `storybook`: Run `storybook` with the name of the package. `yarn storybook @store/ezpay`.
- `storybook:static`: Use to build the storybook pages.
- `test`: Run testing.
- `apollo:watch`: Watch gql files to build schema typescript.
- `tsc`, `tsc:watch`: Test typescript.

###### TODO

- [ ] remove `prop-types`, use `typescript`

## How to write a new package

In each package, we use `less`, `typescript` and `apollo-client`, and we should not add any package in the dependencies packages of `@meepshop/front-end`.

1. Add the new folder in `workspace(store, admin...)`.
2. Add `package.json` in the folder, and copy this:

```
{
  "private": true,
  "name": /** add new name, for example: @store/test */,
  "description": /** add new description */,
  "license": "ISC",
  "author": "meepshop <admin@meepshop.com>",
  "version": "0.1.0",
  "main": "./index.js",
  "types": "./src/index.tsx",
  "keywords": /** add new keywords */
}
```

3. Add `index.js` in the folder, and copy this:

```js
/* eslint-disable */
module.exports =
  process.env.NODE_ENV === 'test'
    ? require('./src/index.tsx')
    : require('./lib/index.js');
```

4. Add `src/__tests__/index.tsx` in the folder, and copy this:

```js
// import
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import runTest from '@meepshop/mock-types/src/runTest';

import /** ComponentName */ from '../index';
import props from '../../mock';

// definition
runTest('store' or 'admin', </** ComponentName */ {...props} />);
```

5. Now, you can start to write your component in `src/index.ts`.

#### Write component with storybook

Before `new schema` can work, you can use `storybook` to write the new component. In this mode, you can mock the result from `apollo-client`.

1. Run `yarn storybook /** scope name, for exampe: @store/ezpay`.
2. (optional) If you need to give the props to component, you can add `mock.ts`. See [@meepshop/mock-types](./packages/mock-types) to learn more detail.

#### Write component with dev server

1. Run `yarn dev`.
2. Run `yarn lerna run dev --stream --scope @admin/server` or `yarn lerna run dev --stream --scope @store/server`.

#### Write unit testing

See [@meepshop/mock-types](./packages/mock-types) to learn more detail.

#### (optional) Build with prod server

1. Run `yarn prod`.
2. Run `yarn lerna run prod --stream --scope @admin/server` or `yarn lerna run prod --stream --scope @store/server`.
3. Run `yarn lerna run start --stream --scope @admin/server` or `yarn lerna run start --stream --scope @store/server`.

#### Package architecture

```sh
workspace(store, admin...)
├── package.json
├── index.js
├── .gitignore (optional)
├── README.md (optional)
├── mock.ts (optional)
└── src
    ├── __tests__
    │   └── index.tsx
    └── index.tsx
```

#### File architecture

```js
// typescript import

// import

// graphql typescript

// graphql import

// typescript definition

// definition
```

#### Fragment name rule

- One fragment in a file: `file name` + `fragment`.
- Multiple fragments in a file: `file name` + `type name` + `fragment`.

## Project roadmap

#### Dev tool

- [lerna](#lerna)
- [babel](#babel)
- [Makefile](#Makefile)
- [typescript](#typescript)
- [eslint](#eslint)
- [prettier](#prettier)
- [lint-staged](#lint-staged)
- [husky](#husky)
- [jest](#jest)
- [storybook](./.storybook)
- [circleci](./.circleci)

#### Workspace

- [packages](./packages)
  - [ ] remove `@meepshop/meep-ui`
  - [ ] move `@meepshop/store` to `@store/server`
- [store](./store)
- [admin](./admin)
- [meepshop](./meepshop)

## lerna

In this project, we use `yarn` with `lerna` and `lerna-changelog` to generate `CHANGELOG.md`. You can see [here](https://yarnpkg.com/lang/en/docs/workspaces/) to lerna why we use `yarn`, and `npm` does not support `workspace` directly.

#### Relative files

- lerna.json
- `workspaces` in `package.json`

## babel

In this project, we use `babel` to build the files expect `@store/server` and `@admin/server`. Owing to use `lerna`, we use `babel-plugin-css-modules-transform` to transform `less`, not use `css-module` with `less-loader`. In order to overwrite `antd style`, we use `preprocessCss` in `babel-plugin-css-modules-transform` to add `#meepshop` in the all class names. To make class names more recognizable, we use `generateScopedName` in `babel-plugin-css-modules-transform` to add the package name in each class name.

#### 3rd Plugins

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)
- [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)
- [babel-plugin-css-modules-transform](https://www.npmjs.com/package/babel-plugin-css-modules-transform)

#### Relative files

- babel.config.js

## Makefile

#### Commands

- `babel-all`: Run babel command in the all pacakges without `@store/server` and `@admin/server`.

  ```sh
  // basic usage
  make babel-all

  // run in the watch mode
  make babel-all WATCH=-w

  // run in the package
  make babel-all OPTION="--scope @meepshop/package-name"
  ```

- `babel-changed`: Run babel command in the packages which are different from `git branch`.

  ```sh
  // basic usage
  make babel-changed

  // run in the watch mode
  make babel-changed WATCH=-w

  // compare the branch
  make babel-changed BRANCH=master
  ```

- `apollo-watch`: Run apollo-tooling in the watch mode.
- `tsc-basic`, `tsc`, `tsc:watch`: Run `tsc`.
- `clean`: Remove `cache`, `lib` and `node_modules`.
- `release`: Generate `CHANGELOG.md` and release the new version with `lerna`.

#### Relative files

- Makefile

#### TOOD

- [ ] `babel-build` should use `--ignore @meeshop/*` after removing `@meepshop/meep-ui`.

## typescript

For static type checking, we use `typescript`. This will check the all files whose file extension is `.ts` or `.tsx`. The 3rd modules are defined in `node_modules/@type` and `types`. For `apollo-client`, we need to add graphql types. we use `apollo` to auto generate graphql types in `__generated__`.

#### Relative files

- tsconfig.json
- types
- apollo.config.js

## eslint

Other eslint config is base on `airbnb` and `pretter`.

#### Relative files

- .eslintrc.js
- .eslintignore

#### TODO

- [ ] only test `.ts`, `.tsx`.

## prettier

We run `prettier` with `lint-staged`.

#### Relative files

- .prettierrc.js

## lint-staged

Run some commands with git staged files.

- `*.js`: prettier, lint
- `*.{ts,tsx}`: prettier, lint
- `**/package.json`: prettier-package-json, prettier
- `*.md`: prettier
- `*.less`: pretter

#### Relative files

- .lintstagedrc.js

#### TODO

- [ ] remove `*.js`

## husky

Run some commands with git hook.

- `pre-commit`: tsc, lint-staged
- `post-merge`: make babel-all
- `post-checkout`: make babel-changed BRANCH=master

## jest

For `apollo-clinet`, we run the all combinations with [@meepshop/mock-types](./packages/mock-types).

#### Relative files

- jest.setup.js
- jest.config.js

[logo-image]: https://gc.meepcloud.com/meepshop/shop/hire/layout/553dbeef7b3649de2d24767e/images/67797-meepshop_logo_1104x372.png
[logo-url]: https://github.com/meepshop/meep-lerna
[circleci-image]: https://circleci.com/gh/meepshop/meep-lerna.svg?style=svg&circle-token=e54a3d5ceee3a9f2139527c7614c8209ea772f90
[circleci-url]: https://circleci.com/gh/meepshop/meep-lerna
[lerna-image]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[lerna-url]: https://lernajs.io/
