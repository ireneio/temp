const path = require('path');

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');

const FONT_FAMILY =
  '"PingFang TC", "Microsoft JhengHei", "Helvetica Neue", "Helvetica", "source-han-sans-traditional", "Arial", "sans-serif"';

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = () => {};
}

// set default env in dev mode
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.STORE_DOMAIN)
    process.env.STORE_DOMAIN = 'bellatest.stage.meepcloud.com';
}

module.exports = withSourceMaps(
  withImages(
    withLess(
      withBundleAnalyzer({
        useFileSystemPublicRoutes: false,
        publicRuntimeConfig: {
          API_HOST: process.env.API_HOST || 'https://api.stage.meepcloud.com',
          EXTERNAL_API_HOST:
            process.env.EXTERNAL_API_HOST || 'https://api.stage.meepcloud.com',
          STORE_DOMAIN: process.env.STORE_DOMAIN,
          VERSION: process.env.REPO_VERSION || +new Date(),
        },
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE,
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../../../analyzer/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../../analyzer/client.html',
          },
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'font-family': FONT_FAMILY,
            'font-family-no-number': FONT_FAMILY,
          },
        },
        /* eslint-disable no-param-reassign */
        webpack: (config, { dev }) => {
          if (!dev) config.devtool = 'source-map';

          config.module.rules.find(
            ({ use: { loader } }) => loader === 'next-babel-loader',
          ).use.options.configFile = path.resolve(
            __dirname,
            '../../babel.config.js',
          );
          config.plugins.push(new MomentLocalesPlugin());
          config.resolve.alias = {
            ...config.resolve.alias,
            // TODO: remove after support next-i18next'
            '@store/utils/lib/i18n': path.resolve(
              __dirname,
              './src/utils/i18n.js',
            ),
          };

          const originalEntry = config.entry;

          config.entry = async () => {
            const entries = await originalEntry();

            // fix for IE
            [
              'core-js/modules/es6.string.starts-with',
              'core-js/modules/es6.object.assign',
              'core-js/modules/es6.symbol', // TODO: remove after next upgrade
            ].forEach(polyfill => {
              if (
                entries['main.js'] &&
                !entries['main.js'].includes(require.resolve(polyfill))
              )
                entries['main.js'].unshift(require.resolve(polyfill));
            });

            return entries;
          };

          return config;
        },
        /* eslint-enable no-param-reassign */
      }),
    ),
  ),
);
