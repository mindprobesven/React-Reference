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
      title: 'Using custom fonts with Sass',
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
      /*
      The asset/resource module emits a separate file and exports the URL.
      By default, asset/resource modules are emitting with [hash][ext][query] filename into output directory.
      */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          // In this case, the output filename is customized and emitted to a specified directory
          // Emitted to the /fonts diretory inside the /dist directory.
          filename: 'fonts/[hash][ext]',
        },
      },
    ],
  },
};
