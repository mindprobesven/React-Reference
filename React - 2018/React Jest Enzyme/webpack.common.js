const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/index.tsx']
  },
  resolve: {
    alias: {
      Root: path.resolve(__dirname, 'src'),
      Components: path.resolve(__dirname, 'src/components/'),
      Scenes: path.resolve(__dirname, 'src/scenes/'),
      Services: path.resolve(__dirname, 'src/services/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React with TypeScript',
      filename: 'index.html',
      path: path.resolve(__dirname, 'dist'),
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      { 
        enforce: 'pre', 
        test: /\.js$/, 
        loader: 'source-map-loader' 
      },
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