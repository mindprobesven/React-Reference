/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');
const { validationResult } = require('express-validator');
const userValidationSchema = require('../validation/userValidationSchema');
const docValidationSchema = require('../validation/docValidationSchema');

const mongoConnection = require('../../mongo/connection');
const UserModel = require('../../mongo/schemas/user');

const logger = require('../../utils/logger');

const adminRouter = express.Router();

adminRouter.use(express.json());

// Middleware
// ------------------------------------------------------------------------------------------------
const checkMongoConnection = (req, res, next) => {
  if (mongoConnection.isConnected) {
    return next();
  }

  logger.express.log({
    level: 'error',
    message: `[ ${req.method} ] 500 - No database connection - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
  });

  res.status(500).json({
    status: 500,
    error: 'No database connection',
  });
};

const validatePostRequest = (validationSchema) => async (req, res, next) => {
  // First checks if the request header contains the fields 'Content-Type' and 'Accept' with an acceptable content type (application/json)
  if (req.get('Content-Type') === 'application/json'
  && req.is('application/json') === 'application/json'
  && req.accepts('application/json') === 'application/json') {
    // Then run the validation process on 'req' using the provided validation schema
    await validationSchema.run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] 400 - Validation failed for incoming data - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    res.status(400).json({
      status: 400,
      error: errors.array(),
    });
  } else {
    logger.express.log({
      level: 'error',
      message: `[ ${req.method} ] 406 - Not acceptable - ${req.get('Accept')} <- -> ${req.get('Content-Type')} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });

    res.status(406).json({
      status: 406,
      error: 'Not acceptable',
    });
  }
};

const validateGetRequest = async (req, res, next) => {
  if (req.accepts('application/json') === 'application/json') {
    return next();
  }
  logger.express.log({
    level: 'error',
    message: `[ ${req.method} ] 406 - Not acceptable - ${req.get('Accept')} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
  });

  res.status(406).json({
    status: 406,
    error: 'Not acceptable',
  });
};

// curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortBy=firstName&sortOrder=asc
// curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?sortBy=createdAt&sortOrder=desc
// curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s
// curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=lastName&searchTerm=k
// curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users/?searchFor=firstName&searchTerm=s&sortBy=firstName&sortOrder=asc
// curl -X GET -H "Accept: application/json" http://127.0.0.1:5000/admin/users
adminRouter.get(
  '/users',
  checkMongoConnection,
  validateGetRequest,
  async (req, res) => {
    try {
      const userModel = new UserModel();
      const users = await userModel.getUsers(req.query);

      logger.express.log({
        level: 'info',
        message: `[ ${req.method} ] 200 - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.status(200).json(users);
    } catch (error) {
      logger.express.log({
        level: 'error',
        message: `[ ${req.method} ] 400 - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.status(400).json({
        status: 400,
        error: `${error.name} - ${error.message}`,
      });
    }
  },
);

// curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sven@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Simon", "lastName":"Weisberger", "email":"simon@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Barbara", "lastName":"Massari Nola", "email":"barbara@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Valentina", "lastName":"Kohn", "email":"valentina@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Thomas", "lastName":"Kohn", "email":"thomas@mindprobe.io"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
adminRouter.post(
  '/user/add',
  checkMongoConnection,
  validatePostRequest(userValidationSchema),
  async (req, res) => {
    // At this point guaranteed:
    // There is a connection to the MongoDB
    // The input data is valid, sanitized and contains all required fields
    try {
      const userModel = new UserModel({ ...req.body });

      const isDuplicate = await userModel.isEmailDuplicate();
      if (isDuplicate) {
        logger.express.log({
          level: 'error',
          message: `[ ${req.method} ] 400 - Email exists - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
        });

        return res.status(400).json({
          status: 400,
          error: [{
            value: req.body.email,
            msg: 'Email exists',
            param: 'email',
            location: 'body',
          }],
        });
      }

      await userModel.save();

      logger.express.log({
        level: 'info',
        message: `[ ${req.method} ] 200 - New user created - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.sendStatus(200);
    } catch (error) {
      logger.express.log({
        level: 'error',
        message: `[ ${req.method} ] 400 - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.status(400).json({
        status: 400,
        error: `${error.name} - ${error.message}`,
      });
    }
  },
);

/*
curl -X POST --data '{"_id":"60e58431be6b9b3fa92bc189", "firstName":"Sven Michel", "lastName":"Kohn", "email":"sven@mindprobe.io", "validated":false}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/edit
curl -X POST --data '{"firstName":"Sven Michel", "lastName":"Kohn", "email":"sven@mindprobe.io", "validated":false}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/edit
*/
adminRouter.post(
  '/user/edit',
  [
    checkMongoConnection,
    // First, validate the incoming user ID
    validatePostRequest(docValidationSchema),
    // Next, validate and sanitize the incoming user data
    validatePostRequest(userValidationSchema),
  ],
  async (req, res) => {
    try {
      // Next, check if a user with the ID exists
      const userModel = new UserModel();
      const docToEdit = await userModel.getUserById(req.body._id);

      if (!docToEdit) {
        throw new Error('User not found');
      }

      const currentEmail = docToEdit.email;
      const newEmail = req.body.email;

      // Next, update the user document with the incoming data
      docToEdit.set({ ...req.body });

      // Next, in case the email has changed, we need to do a duplicate check
      if (currentEmail !== newEmail) {
        const isDuplicate = await docToEdit.isEmailDuplicate();
        if (isDuplicate) {
          logger.express.log({
            level: 'error',
            message: `[ ${req.method} ] 400 - Email exists - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
          });

          return res.status(400).json({
            status: 400,
            error: [{
              value: req.body.email,
              msg: 'Email exists',
              param: 'email',
              location: 'body',
            }],
          });
        }
      }

      // Finally, we use save() to run the schema validation and if it passes, the user data is updated in the database.
      await docToEdit.save();

      logger.express.log({
        level: 'info',
        message: `[ ${req.method} ] 200 - User updated - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.sendStatus(200);
    } catch (error) {
      logger.express.log({
        level: 'error',
        message: `[ ${req.method} ] 400 - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.status(400).json({
        status: 400,
        error: `${error.name} - ${error.message}`,
      });
    }
  },
);

/*
curl -X POST --data '{"_id":"60e583e56dfbb43dbaa8e5bf"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/delete
curl -X POST --data '{"_id":"foo"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/delete
curl -X POST --data '{}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/delete
*/
adminRouter.post(
  '/user/delete',
  [
    checkMongoConnection,
    validatePostRequest(docValidationSchema),
  ],
  async (req, res) => {
    try {
      const userModel = new UserModel();
      const isDeleted = await userModel.deleteUserById(req.body._id);

      if (!isDeleted) {
        throw new Error('Deleting the user failed');
      }

      logger.express.log({
        level: 'info',
        message: `[ ${req.method} ] 200 - User deleted successfully - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.sendStatus(200);
    } catch (error) {
      logger.express.log({
        level: 'error',
        message: `[ ${req.method} ] 400 - ${error.name} - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
      });

      res.status(400).json({
        status: 400,
        error: `${error.name} - ${error.message}`,
      });
    }
  },
);

module.exports = adminRouter;
