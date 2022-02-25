[![logo][logo-image]][logo-url]

# @meepshop/front-end [![circlecI][circleci-image]][circleci-url] [![lerna][lerna-image]][lerna-url]

This project use `lerna` to manage `@store/*` and `@admin/*`.

## scripts

- `clean`: Remove cache, lib, generated typescript and node_modules.
- `dev`: Run `dev` mode
- `lint`, `lint:watch`: Run lint.
- `prod`: Run `prod` mode.
- `storybook:pre`: Run this command before running `storybook` command.
- `test`: Run testing.
- `tsc`: Run typescript.
- `link:env`: link dev env to `@meepshop/next-admin`、`@meepshop/next-store`

## Write packages with template

See [@meepshop/generate](./packages/generate/README.md).

## Write packages with storybook

See [@meepshop/storybook](./packages/storybook/README.md).

## Write unit testing

See [@meepshop/mock-types](./packages/mock-types/README.md).

## Write packages with dev server

1. Run `yarn link:env`.
2. Run `yarn dev`.
3. Run `yarn lerna run dev --stream --scope @meepshop/next-admin` or `yarn lerna run dev --stream --scope @meepshop/next-store`.

## (optional) Build with prod server

1. Run `yarn link:env`.
2. Run `yarn build`.
3. Run `yarn lerna run prod --stream --scope @meepshop/next-admin` or `yarn lerna run prod --stream --scope @meepshop/next-store`.
4. Run `yarn lerna run start --stream --scope @meepshop/next-admin` or `yarn lerna run start --stream --scope @meepshop/next-store`.

---

## Architecture

### Package

```sh
workspace(store, admin...)
├── package.json
├── index.js
├── .gitignore (optional)
├── README.md (optional)
├── mock.ts (optional)
└── src
    ├── __tests__ (optional)
    ├── styles, hooks, gqls, utils (optional)
    ├── sub-components (optional)
    │   ├── styles, hooks, gqls, utils
    │   ├── constants.ts (optional)
    │   └── index.tsx
    ├── constants.ts (optional)
    └── index.tsx
```

### File

```js
// typescript import

// import

// graphql typescript

// graphql import

// typescript definition

// definition
```

### Fragment name rule

- One fragment in a file: `file name` + `fragment`.
- Multiple fragments in a file: `file name` + `type name` + `fragment`.

---

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
- [storybook](./packages/storybook)
- [circleci](./.circleci)

#### Workspace

- [packages](./packages)
- [store](./store)
- [admin](./admin)
- [meepshop](./meepshop)

## lerna

- lerna.json
- `workspaces` in `package.json`

## babel

- babel.config.js

In this project, we use `babel` to build the files expect `@meepshop/next-store` and `@meepshop/next-admin`. Owing to use `lerna`, we use `babel-plugin-css-modules-transform` to transform `less`, not use `css-module` with `less-loader`.

### Custom babel plugin

- [@meepshop/images](./meepshop/images/README.md)
- [@meepshop/icons](./meepshop/icons/README.md)
- [@meepshop/locales](./meepshop/locales/README.md)
- `addDisplayName`: add display names on react components when developing
- `fixLoadable`: fix problems when using `Dynamic Import` with lerna

### 3rd Plugins

- [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)
- [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)
- [babel-plugin-css-modules-transform](https://www.npmjs.com/package/babel-plugin-css-modules-transform)
  - `preprocessCss`: wrap class names with `#meepshop` in order to overwrite `antd style`
  - `generateScopedName`: prefix class name with its own package name to make it more recognizable

## Makefile

- Makefile

### Commands

- `babel-all`: Run babel command in the all pacakges without `@meepshop/next-store` and `@meepshop/next-admin`.

  ```sh
  // basic usage
  make babel-all

  // run in the watch mode
  make babel-all BABEL_OPTION=-w

  // run in the package
  make babel-all OPTION="--scope @meepshop/package-name"
  ```

- `babel-changed`: Run babel command in the packages which are different from `git branch`.

  ```sh
  // basic usage
  make babel-changed

  // run in the watch mode
  make babel-changed BABEL_OPTION=-w

  // compare the branch
  make babel-changed BRANCH=master
  ```

- `apollo-watch`: Run apollo-tooling in the watch mode.
- `tsc-basic`, `tsc`, `tsc:watch`: Run `tsc`.
- `clean`: Remove `cache`, `lib` and `node_modules`.

## typescript

- tsconfig.json
- apollo.config.js
- [@meepshop/types](./meepshop/types/README.md)

For static type checking, we use `typescript`. This will check the all files whose file extension is `.ts` or `.tsx`. The 3rd modules are defined in `node_modules/@type` and `types`. For `apollo-client`, we need to add graphql types. we use `apollo` to auto generate graphql types in `__generated__`.

## eslint

- .eslintrc.js
- .eslintignore

Other eslint config is base on `airbnb` and `pretter`.

## prettier

- .prettierrc.js

We run `prettier` with `lint-staged`.

## lint-staged

- .lintstagedrc.js

Run some commands with git staged files.

- `*.js`: prettier, lint
- `*.{ts,tsx}`: prettier, lint
- `**/package.json`: prettier-package-json, prettier
- `*.md`: prettier
- `*.less`: pretter

## husky

- package.json

Run some commands with git hook.

- `pre-commit`: tsc, lint-staged
- `post-merge`: make babel-all
- `post-checkout`: make babel-changed BRANCH=master

## jest

- jest.setup.js
- jest.config.js

For `apollo-clinet`, we run the all combinations with [@meepshop/mock-types](./packages/mock-types).

[logo-image]: https://img.meepshop.com/x4OWv2vSTUIxIiNnl1uM19HLZUn7xxNXRhYafAeUYuo/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvbWVlcHNob3BMb2dvXzJlZTE4NTQwLnN2Zw.svg
[logo-url]: https://github.com/meepshop/meep-lerna
[circleci-image]: https://circleci.com/gh/meepshop/meep-lerna.svg?style=svg&circle-token=e54a3d5ceee3a9f2139527c7614c8209ea772f90
[circleci-url]: https://circleci.com/gh/meepshop/meep-lerna
[lerna-image]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[lerna-url]: https://lernajs.io/
