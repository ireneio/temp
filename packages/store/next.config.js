const path = require('path');

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const withCSS = require('@zeit/next-css');
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
      withCSS(
        withBundleAnalyzer({
          useFileSystemPublicRoutes: false,
          publicRuntimeConfig: {
            API_HOST: process.env.API_HOST || 'https://api.stage.meepcloud.com',
            EXTERNAL_API_HOST:
              process.env.EXTERNAL_API_HOST ||
              'https://api.stage.meepcloud.com',
            STORE_DOMAIN: process.env.STORE_DOMAIN,
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
            ).use.options.configFile = '../../babel.config.js';

            config.plugins.push(new MomentLocalesPlugin());

            const originalEntry = config.entry;

            config.entry = async () => {
              const entries = await originalEntry();
              const polyfillsPath = path.resolve(
                __dirname,
                './src/static/polyfills.js',
              );

              if (
                entries['main.js'] &&
                !entries['main.js'].includes(polyfillsPath)
              )
                entries['main.js'].unshift(polyfillsPath);

              return entries;
            };

            return config;
          },
          /* eslint-enable no-param-reassign */
        }),
      ),
    ),
  ),
);
