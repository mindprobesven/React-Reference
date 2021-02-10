const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/index.js']
  },
  resolve: {
    alias: {
      Root: path.resolve(__dirname, 'src'),
      Components: path.resolve(__dirname, 'src/components/'),
      Scenes: path.resolve(__dirname, 'src/scenes/'),
      Services: path.resolve(__dirname, 'src/services/')
    },
    extensions: ['.js', '.jsx']
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React API Reference',
      filename: 'index.html',
      path: path.resolve(__dirname, 'dist'),
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
              ['@babel/preset-stage-0', { "decoratorsLegacy": true }]
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
};