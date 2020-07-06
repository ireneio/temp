/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');

const babelConfig = require('../babel.config');

module.exports = ({ config }) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const { name } = require(path.resolve('./package.json'));

  const moduleFragmentName = `${name}/lib/fragment`;
  const moduleFragmentPath = path.resolve('./src/fragment.ts');
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

  config.resolve.extensions = ['.ts', '.tsx', ...config.resolve.extensions];
  config.resolve.alias = {
    ...config.resolve.alias,
    ...(!fs.existsSync(moduleFragmentPath)
      ? {}
      : {
          [moduleFragmentName]: moduleFragmentPath,
        }),
    'next/router': path.resolve(__dirname, '../__mocks__/next/router'),
    'next/link': path.resolve(__dirname, '../__mocks__/next/link'),
    'next/head': path.resolve(__dirname, '../__mocks__/next/head'),
    'next/config': path.resolve(__dirname, '../__mocks__/next/config'),
    'next-i18next': path.resolve(__dirname, '../__mocks__/next-i18next'),
  };
  config.plugins = config.plugins.filter(
    ({ constructor }) => constructor.name !== 'ProgressPlugin',
  );

  return config;
};
