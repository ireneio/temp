/* eslint-disable no-param-reassign */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const addIEPolyfill = ({ webpack, ...nextConfig }) => ({
  ...nextConfig,
  webpack: (config, options) => {
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      [
        'core-js/modules/es.string.starts-with',
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

    return typeof webpack !== 'function' ? config : webpack(config, options);
  },
});

const addLessLoader = ({ lessLoaderOptions, webpack, ...nextConfig }) => ({
  ...nextConfig,
  webpack: (config, options) => {
    config.module.rules.slice(-1)[0].oneOf.forEach(rule => {
      if (rule.test?.source !== '\\.module\\.(scss|sass)$') return;

      rule.test = /\.less$/;
      rule.use = rule.use.filter(
        eachRule => !/(sass-loader)/.test(eachRule.loader),
      );
      rule.use.find(({ loader }) =>
        /css-loader/.test(loader),
      ).options.modules = false;

      delete rule.issuer;
      rule.use.push({
        loader: 'less-loader',
        options: {
          ...lessLoaderOptions,
          sourceMap: true,
          javascriptEnabled: true,
        },
      });
    });

    // FIXME: Remove after next.js upgrade (mini-css-extract-plugin error)
    if (config.optimization.splitChunks.cacheGroups?.shared?.minChunks)
      config.optimization.splitChunks.cacheGroups.shared.minChunks = 3;

    return typeof webpack !== 'function' ? config : webpack(config, options);
  },
});

module.exports = nextConfig =>
  addIEPolyfill(
    addLessLoader(
      withBundleAnalyzer({
        ...nextConfig,
        // FIXME: should move server folder
        distDir: '../lib',
        pageExtensions: ['js', 'ts', 'tsx'],
        productionBrowserSourceMaps: true,
        webpack5: false,
        typescript: {
          ignoreBuildErrors: true,
        },
        publicRuntimeConfig: {
          ...nextConfig.publicRuntimeConfig,
          ENV: process.env.ENV || 'stage',
          LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        },
      }),
    ),
  );
