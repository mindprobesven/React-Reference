const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');

const app = express();
const port = 5555;
const distDir = path.resolve(__dirname, '../dist');

app.use(express.static(distDir));

app.use(requestLogger);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log('-'.repeat(60));
  console.log(`Production server running at http://localhost:${port}`);
  console.log('-'.repeat(60));
});
