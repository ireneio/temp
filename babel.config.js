module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
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
        keepImport: process.env.NODE_ENV !== 'test',
        extractCss: {
          dir: './lib',
          relativeRoot: './src',
          filename: '[path]/[name].less',
        },
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
          '@babel/plugin-transform-runtime',
          {
            helpers: false,
            polyfill: false,
            regenerator: true,
            moduleName: '@babel/runtime',
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
