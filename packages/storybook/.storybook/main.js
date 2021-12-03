/* eslint-disable no-param-reassign */
const path = require('path');

const babelConfig = require('../../../babel.config.js');

const rootFolder = path.resolve(__dirname, '../../..');

module.exports = {
  stories: [
    '../src/*.tsx',
    '../src/readme/**/*.tsx',
    ...(process.env.STORYBOOK_ENV !== 'dev' ? [] : ['../src/cache/**/*.tsx']),
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
  ],
  webpackFinal: config => {
    const cssModulesTransformPlugin = babelConfig.plugins.find(
      plugin => plugin[0] === 'css-modules-transform',
    );

    config.module.rules = [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
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
      ...config.module.rules.filter(({ test }) => !/tsx/.test(test.toString())),
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      'next/router': path.resolve(rootFolder, './__mocks__/next/router'),
      'next/link': path.resolve(rootFolder, './__mocks__/next/link'),
      'next/head': path.resolve(rootFolder, './__mocks__/next/head'),
      'next/config': path.resolve(rootFolder, './__mocks__/next/config'),
      'next-i18next': path.resolve(rootFolder, './__mocks__/next-i18next'),
      // FIXME: should use @apollo/client path
      'apollo-link-http': path.resolve(
        rootFolder,
        './__mocks__/apollo-link-http',
      ),
    };

    config.plugins = config.plugins.filter(
      ({ constructor }) => constructor.name !== 'ProgressPlugin',
    );

    return config;
  },
};
