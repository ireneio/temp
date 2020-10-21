/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');

const babelConfig = require('../babel.config');

module.exports = ({ config }) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const { dependencies } = require(path.resolve(
    __dirname,
    '../meepshop/modules/package.json',
  ));

  const cssModulesTransformPlugin = babelConfig.plugins.find(
    plugin => plugin[0] === 'css-modules-transform',
  );

  config.module.rules = [
    {
      test: /\.(tsx?|jsx?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '../babel.config.js'),
          sourceType: 'unambiguous',
          plugins: [
            [
              cssModulesTransformPlugin[0],
              {
                ...cssModulesTransformPlugin[1],
                extractCss: path.resolve(__dirname, './combined.less'),
              },
            ],
          ],
        },
      },
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    },
    ...config.module.rules,
  ];

  const addGqlsAlias = (key, gqls) => {
    const moduleGqlsName = `${key}/lib/${gqls}`;
    const moduleGqlsPath = path.resolve(
      __dirname,
      key.replace(/@/, '../'),
      // TODO: remove fragment.ts when all fragments move to fragments folder
      gqls === 'fragment' ? './src/fragment.ts' : `./src/${gqls}/index.ts`,
    );

    return !fs.existsSync(moduleGqlsPath)
      ? {}
      : {
          [moduleGqlsName]: moduleGqlsPath,
        };
  };

  config.resolve.extensions = ['.ts', '.tsx', ...config.resolve.extensions];
  config.resolve.alias = {
    ...config.resolve.alias,
    ...Object.keys(dependencies).reduce(
      (result, key) => ({
        ...result,
        // TODO: remove fragment when all fragments move to fragments folder
        ...addGqlsAlias(key, 'fragment'),
        ...addGqlsAlias(key, 'fragments'),
        ...addGqlsAlias(key, 'gqls'),
      }),
      {},
    ),
    'next/router': path.resolve(__dirname, '../__mocks__/next/router'),
    'next/link': path.resolve(__dirname, '../__mocks__/next/link'),
    'next/head': path.resolve(__dirname, '../__mocks__/next/head'),
    'next/config': path.resolve(__dirname, '../__mocks__/next/config'),
    'next-i18next': path.resolve(__dirname, '../__mocks__/next-i18next'),
    'apollo-link-http': path.resolve(
      __dirname,
      '../__mocks__/apollo-link-http',
    ),
  };
  config.plugins = config.plugins.filter(
    ({ constructor }) => constructor.name !== 'ProgressPlugin',
  );

  return config;
};
