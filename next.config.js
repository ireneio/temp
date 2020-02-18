/* eslint-disable no-param-reassign */

const path = require('path');

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');

const addBabelConfig = config => {
  config.module.rules.find(
    ({ use: { loader } }) => loader === 'next-babel-loader',
  ).use.options.configFile = path.resolve(__dirname, './babel.config.js');
};

const addIEPolyfill = config => {
  const originalEntry = config.entry;

  config.entry = async () => {
    const entries = await originalEntry();

    [
      'core-js/modules/es.string.starts-with',
      'core-js/modules/es.object.assign',
      'core-js/modules/es.symbol',
      'core-js/modules/es.array.from',
    ].forEach(polyfill => {
      if (
        entries['main.js'] &&
        !entries['main.js'].includes(require.resolve(polyfill))
      )
        entries['main.js'].unshift(require.resolve(polyfill));
    });

    return entries;
  };
};

// FIXME: https://github.com/zeit/next-plugins/issues/392#issuecomment-475845330
const fixCssLoaderError = config => {
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use))
      rule.use.forEach(use => {
        if (use.loader === 'css-loader' && use.options)
          delete use.options.minimize;
      });
  });
};

const serverCssFileSupport = config => {
  const originalEntry = config.entry;

  config.entry = async () => {
    const entries = await originalEntry();
    const prefix =
      process.cwd() === path.resolve(__dirname, './admin/server')
        ? '@admin'
        : '@store';

    Object.keys(entries).forEach(filename => {
      entries[filename] = [
        `${prefix}/utils/lib/handleCssImport.js`,
        ...entries[filename],
      ];
    });

    return entries;
  };
};

module.exports = nextConfig =>
  withSourceMaps(
    withImages(
      withLess(
        withBundleAnalyzer({
          ...nextConfig,
          pageExtensions: ['js', 'ts', 'tsx'],
          lessLoaderOptions: {
            ...nextConfig.lessLoaderOptions,
            javascriptEnabled: true,
          },
          webpack: (config, { dev, isServer }) => {
            if (!dev) config.devtool = 'source-map';

            config.plugins.push(new MomentLocalesPlugin());
            addBabelConfig(config);
            addIEPolyfill(config);
            fixCssLoaderError(config);

            if (isServer) serverCssFileSupport(config);

            return config;
          },
        }),
      ),
    ),
  );
