const path = require('path');

module.exports = ({ config }) => {
  config.module.rules = [
    {
      test: /\.(tsx?|jsx?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '../babel.config.js'),
        },
      },
    },
    {
      test: /\.less$/,
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
    ...config.module.rules,
  ];

  config.resolve.extensions = ['.ts', '.tsx', ...config.resolve.extensions];

  return config;
};
