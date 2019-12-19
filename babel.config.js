const path = require('path');

const findPkgDir = require('find-pkg-dir');
const kebabCase = require('lodash.kebabcase');

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
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
    '@babel/proposal-export-default-from', // TODO: remove, typescript not support
    [
      '@babel/proposal-decorators',
      {
        legacy: true, // TODO: remove, typescript not support
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
        lodash: {
          transform: 'lodash/${member}',
        },
        fbjs: {
          transform: 'fbjs/lib/${member}',
        },
        validator: {
          transform: 'validator/lib/${member}',
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
        ignore: /antd/,
        preprocessCss: css => {
          if (/ignore generateScopedName/.test(css)) return css;

          if (/@import/.test(css))
            return `${css.replace(
              /(@import.*;\n?)+/,
              '$&:global(#meepshop) {',
            )}}`;

          return `:global(#meepshop) { ${css} }`;
        },
        generateScopedName: (name, filePath) => {
          const pkgDir = findPkgDir(filePath);
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const { name: pkgName } = require(path.resolve(
            pkgDir,
            './package.json',
          ));

          return `${pkgName.replace(/^@/, '').replace(/\//g, '-')}__${path
            .relative(pkgDir, filePath)
            .replace(/(src\/|styles\/)/g, '')
            .replace(/\//g, '-')
            .replace(/\.less$/, '')}__${name}`;
        },
        devMode: process.env.NODE_ENV !== 'production',
        keepImport: process.env.NODE_ENV !== 'test',
        extractCss:
          process.env.NODE_ENV === 'test'
            ? path.resolve(__dirname, './.storybook/combined.less')
            : {
                dir: './lib',
                relativeRoot: './src',
                filename: '[path]/[name].less',
              },
      },
    ],
  ],
  ignore: [
    '**/__generated__/**',
    ...(process.env.NODE_ENV === 'test' ? [] : ['**/__tests__/**']),
  ],
};
