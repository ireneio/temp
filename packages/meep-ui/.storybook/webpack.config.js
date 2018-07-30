const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
        },
      },
    },
    {
      test: /\.less$/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../tool'),
      ],
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]',
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
