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
      'module-resolver',
      {
        root: ['./src'],
        cwd: process.cwd(),
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
      'css-modules-transform',
      {
        extensions: ['.less'],
        generateScopedName: '[path][name]__[local]',
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
            root: ['./packages/meep-ui/src'],
            cwd: process.cwd(),
            alias: {
              __toolMeepUI__: './',
              tool: './tool',
            },
          },
        ],
        [
          'css-modules-transform',
          {
            extensions: ['.less'],
            generateScopedName: '[path][name]__[local]',
            keepImport: process.env.NODE_ENV === 'production',
            extractCss: {
              dir: './packages/meep-ui/lib',
              relativeRoot: './packages/meep-ui/src',
              filename: '[path]/[name].less',
            },
          },
        ],
      ],
    },
    {
      test: './packages/store',
      presets: ['next/babel'],
      plugins: [
        'module-resolver',
        {
          root: ['./packages/store/src'],
          cwd: process.cwd(),
        },
      ],
    },
  ],
};
