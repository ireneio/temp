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

  if (/ignore meepshop id/.test(newCss)) return newCss;

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

const modulesGqlsAlias = (() => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { dependencies } = require(path.resolve(
    require.resolve('@meepshop/modules'),
    '../package.json',
  ));

  return Object.keys(dependencies).reduce(
    (result, key) => ({
      ...result,
      [`${key}/gqls`]: `${key}/lib/gqls`,
    }),
    {},
  );
})();

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
        '@meepshop/hooks': {
          transform: '@meepshop/hooks/lib/${member}',
        },
        '@admin/hooks': {
          transform: '@admin/hooks/lib/${member}',
        },
        /* eslint-enable no-template-curly-in-string */
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        cwd: 'packagejson',
        alias: {
          ...modulesGqlsAlias,
          // FIXME: should auto add or checking
          '@store/group/gqls': '@store/group/lib/gqls',
          '@meepshop/page/gqls': '@meepshop/page/lib/gqls',
          '@meepshop/modules/gqls': '@meepshop/modules/lib/gqls',
        },
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
  ignore: [
    '**/__generated__/**',
    ...(process.env.NODE_ENV === 'test' ? [] : ['**/__tests__/**']),
  ],
};
