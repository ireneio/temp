const kebabCase = require('lodash.kebabcase');
const { parse: lessParser } = require('postcss-less');

const generateScopedName = require('./babel/generateScopedName');
const preprocessCss = require('./babel/preprocessCss');
const addDisplayName = require('./babel/addDisplayName');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    addDisplayName,
    '@meepshop/images/babel',
    '@meepshop/icons/babel',
    '@babel/transform-runtime',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
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
        '^(fbjs|validator)$': {
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
        ignore: /(antd|meepshop\/utils)/,
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
  ],
  ignore: process.env.NODE_ENV === 'test' ? [] : ['**/__tests__/**'],
};
