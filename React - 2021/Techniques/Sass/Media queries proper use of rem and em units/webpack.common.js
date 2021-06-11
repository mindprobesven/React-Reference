const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          globOptions: {
            ignore: ['**/index.html'],
          },
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Media queries with Sass',
      filename: 'index.html',
      template: path.join(path.resolve(__dirname, 'public'), 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
