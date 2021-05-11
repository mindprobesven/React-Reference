const { merge } = require('webpack-merge');

const HotModuleReplacementPlugin = require('webpack-hot-middleware');

const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
  },
  entry: {
    app: ['webpack-hot-middleware/client', './src/index.jsx'],
  },
  resolve: {
    // This alias declaration replaces react-dom with the @hot-loader/react-dom
    // package. Required for React Hooks hot-reloading support.
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    // new HotModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
});
