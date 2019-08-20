const path = require('path');

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');
const withImages = require('next-images');
const withSourceMaps = require('@zeit/next-source-maps');
const withTM = require('next-transpile-modules');

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
  withTypescript(
    withImages(
      withLess(
        withBundleAnalyzer(
          withTM({
            transpileModules: ['next-i18next'],
            useFileSystemPublicRoutes: false,
            publicRuntimeConfig: {
              API_HOST:
                process.env.API_HOST || 'https://api.stage.meepcloud.com',
              EXTERNAL_API_HOST:
                process.env.EXTERNAL_API_HOST ||
                'https://api.stage.meepcloud.com',
              STORE_DOMAIN: process.env.STORE_DOMAIN,
              VERSION: process.env.REPO_VERSION || +new Date(),
            },
            analyzeServer: ['server', 'both'].includes(
              process.env.BUNDLE_ANALYZE,
            ),
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

              const originalEntry = config.entry;

              config.entry = async () => {
                const entries = await originalEntry();

                // fix for IE
                [
                  'core-js/modules/es6.string.starts-with',
                  'core-js/modules/es6.object.assign',
                  'core-js/modules/es6.symbol',
                  'core-js/modules/es6.array.from',
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
    ),
  ),
);
