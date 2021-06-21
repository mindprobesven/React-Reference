const express = require('express');

const { ENV_NAME, EXPRESS_PORT } = require('./config/config');
const adminRouter = require('./routes/admin');
const cl = require('./utils/cl');

app = express();

app.use('/admin', adminRouter);

app.get('*', (req, res) => {
  res.status(404).send('Bad request');
})

app.listen(EXPRESS_PORT, () => {
  cl(`${ENV_NAME} server listening on port ${EXPRESS_PORT}!`)
});
