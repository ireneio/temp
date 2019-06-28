/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.(tsx?|jsx?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '../babel.config.js'),
          sourceType: 'unambiguous',
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
    'next/router': path.resolve(__dirname, '../__mocks__/next/router'),
    'next/link': path.resolve(__dirname, '../__mocks__/next/link'),
    'next-i18next': path.resolve(__dirname, '../__mocks__/next-i18next'),
  };

  return config;
};
