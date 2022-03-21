const kebabCase = require('lodash.kebabcase');
const { parse: lessParser } = require('postcss-less');
const reactLoadablePlugin = require('next/dist/build/babel/plugins/react-loadable-plugin');

const generateScopedName = require('./babel/generateScopedName');
const preprocessCss = require('./babel/preprocessCss');
const addDisplayName = require('./babel/addDisplayName');
const fixLoadable = require('./babel/fixLoadable');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        exclude: ['@babel/plugin-proposal-dynamic-import'],
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    addDisplayName,
    '@meepshop/images/babel',
    '@meepshop/icons/babel',
    '@meepshop/locales/babel',
    '@babel/transform-runtime',
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            'preset-default',
            'removeXMLNS',
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke|stroke-width|mask|filter)',
              },
            },
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [
                  {
                    viewBox: '64 64 896 896',
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    // TODO: remove, typescript not support
    [
      '@babel/proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/proposal-class-properties',
    [
      'transform-imports',
      {
        /* eslint-disable no-template-curly-in-string */
        antd: {
          transform: key => `antd/lib/${kebabCase(key)}`,
        },
        ramda: {
          transform: key => `ramda/src/${key}`,
        },
        '^(@ant-design/icons|date-fns)$': {
          transform: '${1}/${member}',
        },
        '^(fbjs|validator|react-use)$': {
          transform: '${1}/lib/${member}',
        },
        '^@(meepshop|store|admin)/(icons|context|hooks|validator)$': {
          transform: '@${1}/${2}/lib/${member}',
        },
        '^@(meepshop|store|admin)/([\\w-]+)/gqls$': {
          transform: '@${1}/${2}/lib/gqls',
          skipDefaultConversion: true,
        },
        /* eslint-enable no-template-curly-in-string */
      },
    ],
    // TODO: remove, only for meep-ui
    [
      'module-resolver',
      {
        root: ['./src'],
        cwd: 'packagejson',
      },
    ],
    [
      'css-modules-transform',
      {
        extensions: ['.less'],
        ignore: /antd/,
        processorOpts: { parser: lessParser },
        preprocessCss,
        generateScopedName,
        devMode: process.env.NODE_ENV !== 'production',
        keepImport: process.env.NODE_ENV !== 'test',
        extractCss:
          process.env.NODE_ENV === 'test'
            ? false
            : {
                dir: './lib',
                relativeRoot: './src',
                filename: '[path]/[name].less',
              },
      },
    ],
    ...(process.env.NODE_ENV === 'test'
      ? []
      : [reactLoadablePlugin, fixLoadable]),
  ],
  ignore: process.env.NODE_ENV === 'test' ? [] : ['**/__tests__/**'],
};
