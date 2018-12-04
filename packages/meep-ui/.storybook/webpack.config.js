const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const root = path.resolve(__dirname, '..');

module.exports = (storybookBaseConfig, configType) => {
  if (configType === 'DEVELOPMENT') {
    storybookBaseConfig.plugins.push(
      new BundleAnalyzerPlugin({ openAnalyzer: false }),
    );
  }

  storybookBaseConfig.module.rules.shift();
  storybookBaseConfig.module.rules.push(
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          configFile: '../../babel.config.js',
          plugins: [
            [
              'module-resolver',
              {
                root: ['./src', './tool'],
                cwd: root,
              },
            ],
            [
              'css-modules-transform',
              {
                extensions: ['.less'],
                generateScopedName: '[path][name]__[local]',
                devMode: process.env.NODE_ENV !== 'production',
                keepImport: true,
              },
            ],
          ],
        },
      },
    },
    {
      test: /\.less$/,
      include: /styles/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]',
            getLocalIdent: (context, localIdentName, localName, options) =>
              `${context.resourcePath
                .replace(root, '')
                .replace(/(^\/)|(\.less)/g, '')
                .replace(/\//g, '-')}__${localName}`,
          },
        },
        {
          loader: 'less-loader',
        },
      ],
    },
    {
      test: /\.less$/,
      include: /node_modules\/antd\/lib/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    },
  );

  return storybookBaseConfig;
};
