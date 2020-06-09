const path = require('path');

const findPkgDir = require('find-pkg-dir');
const kebabCase = require('lodash.kebabcase');
const { parse: lessParser } = require('postcss-less');

const handleCssRelativePath = (css, filePath) => {
  if (process.env.NODE_ENV !== 'test') return css;

  return css.replace(/@import ['"](.*)['"];/g, (match, p1) => {
    try {
      require.resolve(p1.replace(/~/g, ''));

      return match;
    } catch (e) {
      return match.replace(p1, path.resolve(path.dirname(filePath), p1));
    }
  });
};

const preprocessCss = (css, filePath) => {
  const newCss = handleCssRelativePath(css, filePath);

  if (/ignore generateScopedName/.test(newCss)) return newCss;

  if (/@import/.test(newCss))
    return `${newCss.replace(/(@import.*;\n?)+/, '$&:global(#meepshop) {')}}`;

  return `:global(#meepshop) { ${newCss} }`;
};

const generateScopedName = (name, filePath) => {
  const pkgDir = findPkgDir(filePath);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { name: pkgName } = require(path.resolve(pkgDir, './package.json'));

  return `${pkgName.replace(/^@/, '').replace(/\//g, '-')}__${path
    .relative(pkgDir, filePath)
    .replace(/(src\/|styles\/)/g, '')
    .replace(/\//g, '-')
    .replace(/\.less$/, '')}__${name}`;
};

/**
 * FIX mixin error
 * @example
 * originial code:
 *   .mixin();
 *
 * bug:
 *   @mixin();
 *
 * fix:
 *   .css-module-classname-mixin();
 */
const processCss = (css, filePath) =>
  (css.match(/@[^ ]*\(/g) || [])
    .filter(text => !/media/.test(text))
    .reduce(
      (result, pattern) =>
        result.replace(
          pattern,
          pattern.replace(
            /@([\w_-]*)/,
            (match, name) => `.${generateScopedName(name, filePath)}`,
          ),
        ),
      css,
    );

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
    '@meepshop/images/babel',
    '@meepshop/icons/babel',
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
        '@meepshop/icons': {
          transform: '@meepshop/icons/lib/${member}',
        },
        '@meepshop/context': {
          transform: '@meepshop/context/lib/${member}',
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
        processorOpts: { parser: lessParser },
        preprocessCss,
        processCss,
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
  ignore: [
    '**/__generated__/**',
    ...(process.env.NODE_ENV === 'test' ? [] : ['**/__tests__/**']),
  ],
};
