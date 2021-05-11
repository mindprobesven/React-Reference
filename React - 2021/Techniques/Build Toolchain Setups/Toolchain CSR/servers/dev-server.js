/*
----------------------------------------------------------------------------------------

Express Webpack Development Server

Requires (webpack-dev-middleware)
A wrapper that will emit files processed by webpack to an express server.

----------------------------------------------------------------------------------------
*/

const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// Grab the configuration object from the webpack.dev.js
const config = require('../webpack.dev.js');

// Pass it to webpack and create a compiler
const compiler = webpack(config);

const app = express();
const port = 3000;

// Use the webpackDevMiddleware with the compiler and a set of options
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
  console.log('-'.repeat(61));
  console.log(`Development server running at http://localhost:${port}`);
  console.log('-'.repeat(60));
});
