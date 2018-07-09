// TODO
const addPlugins = [];

/* eslint-disable no-template-curly-in-string */
const transformImportsOtions = {
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
};
/* eslint-enable no-template-curly-in-string */

if (process.env.NODE_ENV === 'production') {
  addPlugins.push([
    'css-modules-transform',
    {
      keepImport: true,
      extensions: ['.less'],
      generateScopedName: '[path][name]__[local]',
      extractCss: {
        dir: './lib/',
        relativeRoot: './src/',
        filename: '[path]/[name].less',
      },
    },
  ]);
}

if (process.env.NODE_ENV === 'test') {
  addPlugins.push([
    'css-modules-transform',
    {
      extensions: ['.less'],
      generateScopedName: '[path][name]__[local]',
    },
  ]);
  transformImportsOtions.antd = {
    // eslint-disable-next-line no-template-curly-in-string
    transform: 'antd/lib/${member}',
    kebabCase: true,
  };
} else {
  addPlugins.push([
    'import',
    {
      libraryName: 'antd',
      style: 'css',
    },
  ]);
}

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
    ...addPlugins,
    [
      'module-resolver',
      {
        root: ['./src'],
        cwd: process.cwd(),
        alias: {
          __toolMeepUI__: './',
          tool: './tool',
        },
      },
    ],
    ['transform-imports', transformImportsOtions],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
  ],
};
