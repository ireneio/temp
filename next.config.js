/* eslint-disable no-param-reassign */

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withLess = require('@zeit/next-less');

const addIEPolyfill = config => {
  const originalEntry = config.entry;

  config.entry = async () => {
    const entries = await originalEntry();

    [
      'core-js/modules/es.string.starts-with',
      'core-js/modules/es.object.assign',
      'core-js/modules/es.symbol',
      'core-js/modules/es.array.from',
      'core-js/modules/es.array.fill',
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

module.exports = nextConfig =>
  withLess(
    withBundleAnalyzer({
      ...nextConfig,
      // FIXME: should move server folder
      distDir: '../lib',
      pageExtensions: ['js', 'ts', 'tsx'],
      productionBrowserSourceMaps: true,
      typescript: {
        ignoreBuildErrors: true,
      },
      lessLoaderOptions: {
        ...nextConfig.lessLoaderOptions,
        javascriptEnabled: true,
      },
      publicRuntimeConfig: {
        ...nextConfig.publicRuntimeConfig,
        API: process.env.API || 'https://api.stage.meepcloud.com',
        VERSION: process.env.VERSION || +new Date(),
        ENV: process.env.ENV || 'stage',
      },
      webpack: config => {
        config.plugins.push(new MomentLocalesPlugin());
        addIEPolyfill(config);
        fixCssLoaderError(config);

        return config;
      },
    }),
  );
