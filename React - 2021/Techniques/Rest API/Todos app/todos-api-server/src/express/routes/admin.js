/* eslint-disable max-len */
const express = require('express');
const userModelExport = require('../../mongo/schemas/user');
const logger = require('../../utils/logger');

const adminRouter = express.Router();

adminRouter.use(express.json());

// curl -X POST --data '{"user":"mindprobesven", "firstName":"Sven", "lastName":"Kohn"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
adminRouter.post('/user/add', async (req, res) => {
  const allowedContentType = 'application/json';

  if (req.get('Content-Type') === allowedContentType
  && req.is('application/json') === allowedContentType
  && req.accepts('application/json') === allowedContentType) {
    try {
      const savedUserDoc = await userModelExport.addUser(req.body);
      console.log(savedUserDoc);
      res.sendStatus(200);
    } catch (error) {
      logger.mongo.log({
        level: 'error',
        message: `Schema validation failed - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });
      res.status(403).send('403 - Validation Failed');
    }
  } else {
    logger.express.log({
      level: 'error',
      message: `406 - [ ${req.method} ] ${req.get('Accept')} <- -> ${req.get('Content-Type')} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    res.status(406).send('406 - Not Acceptable');
  }
});

adminRouter.get('/', (req, res) => {
  res.json({ username: 'mindprobesven' });
});

module.exports = adminRouter;
