module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
      },
    ],
    '@babel/react',
  ],
  plugins: [
    '@babel/proposal-optional-chaining',
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
        cwd: 'packagejson',
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
      plugins: ['@babel/proposal-export-default-from'],
    },
    {
      test: './packages/store',
      presets: ['next/babel'],
    },
  ],
};
