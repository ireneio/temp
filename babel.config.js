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
    '@babel/transform-runtime',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-export-default-from',
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
          transform: 'antd/lib/${member}',
          kebabCase: true,
        },
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
        preprocessCss: css => `:global(#meepshop) { ${css} }`,
        devMode: process.env.NODE_ENV !== 'production',
        keepImport: true,
        ignore: /antd/,
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
      test: './packages/store',
      presets: ['next/babel'],
    },
  ],
};
