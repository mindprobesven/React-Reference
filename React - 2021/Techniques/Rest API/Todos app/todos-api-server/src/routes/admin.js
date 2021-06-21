const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
  res.send('<h1>Admin home page</h1>');
});

module.exports = adminRouter;
