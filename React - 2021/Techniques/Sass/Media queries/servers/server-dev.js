const express = require('express');

const history = require('connect-history-api-fallback');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev.js');

const requestLogger = require('./middleware/requestLogger');

const compiler = webpack(config);

const app = express();
const port = 3000;

app.use(requestLogger);

app.use(history());

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
  console.log('-'.repeat(60));
  console.log(`Development server running at http://localhost:${port}`);
  console.log('-'.repeat(60));
});
