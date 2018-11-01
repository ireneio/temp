const path = require('path');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'transform-imports',
      {
        /* eslint-disable no-template-curly-in-string */
        lodash: {
          transform: 'lodash/${member}',
        },
        fbjs: {
          transform: 'fbjs/lib/${member}',
        },
        validator: {
          transform: 'validator/lib/${member}',
        },
        'react-icons/fa': {
          transform: 'react-icons/lib/fa/${member}',
          kebabCase: true,
        },
        'react-icons/md': {
          transform: 'react-icons/lib/md/${member}',
          kebabCase: true,
        },
        /* eslint-enable no-template-curly-in-string */
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: process.env.NODE_ENV !== 'test',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
    [
      'css-modules-transform',
      {
        extensions: ['.less'],
        generateScopedName: '[path][name]__[local]',
        devMode: process.env.NODE_ENV !== 'production',
        ...(process.env.NODE_ENV === 'test'
          ? {}
          : {
              keepImport: true,
              extractCss: {
                dir: './lib',
                relativeRoot: './src',
                filename: '[path]/[name].less',
              },
            }),
      },
    ],
  ],
  ignore: process.env.NODE_ENV === 'test' ? [] : ['**/__tests__/**'],
  overrides: [
    {
      test: './packages/meep-ui',
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        [
          'module-resolver',
          {
            root: ['./src'],
            cwd: path.resolve(__dirname, './packages/meep-ui'),
            alias: {
              tool: './tool',
            },
          },
        ],
      ],
    },
    {
      test: './packages/meep-ui/tool',
      plugins: [
        [
          'css-modules-transform',
          {
            extensions: ['.less'],
            generateScopedName: '[path][name]__[local]',
            devMode: process.env.NODE_ENV !== 'production',
            ...(process.env.NODE_ENV === 'test'
              ? {}
              : {
                  keepImport: true,
                  extractCss: {
                    dir: './lib/__tool__',
                    relativeRoot: './tool',
                    filename: '[path]/[name].less',
                  },
                }),
          },
        ],
      ],
    },
    {
      test: './packages/store',
      presets: ['next/babel'],
    },
  ],
};
