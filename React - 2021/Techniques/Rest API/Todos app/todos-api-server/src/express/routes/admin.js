/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');
const validator = require('validator');
const { validationResult, checkSchema } = require('express-validator');

const mongoConnection = require('../../mongo/connection');
const userModelMethods = require('../../mongo/schemas/user');
const logger = require('../../utils/logger');

const adminRouter = express.Router();

adminRouter.use(express.json());

const userValidationSchema = checkSchema({
  email: {
    trim: true,
    notEmpty: {
      errorMessage: 'Email address not specified',
      bail: true,
    },
    isLength: {
      options: { max: 50 },
      errorMessage: 'Email address is too long',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Invalid email address',
    },
    normalizeEmail: true,
  },
  firstName: {
    trim: true,
    notEmpty: {
      errorMessage: 'Not specified',
      bail: true,
    },
    isLength: {
      options: { max: 50 },
      errorMessage: 'Too long',
      bail: true,
    },
    // Custom isAlpha validator to allow special characters (e.g. ñ,ü) for multiple locales
    custom: {
      options: (value) => {
        if (validator.isAlpha(value, 'en-US', { ignore: ' -' })
        || validator.isAlpha(value, 'es-ES', { ignore: ' -' })
        || validator.isAlpha(value, 'de-DE', { ignore: ' -' })) {
          return value;
        }
        throw new Error('Invalid characters');
      },
    },
  },
  lastName: {
    trim: true,
    notEmpty: {
      errorMessage: 'Not specified',
      bail: true,
    },
    isLength: {
      options: { max: 50 },
      errorMessage: 'Too long',
      bail: true,
    },
    custom: {
      options: (value) => {
        if (validator.isAlpha(value, 'en-US', { ignore: ' -' })
        || validator.isAlpha(value, 'es-ES', { ignore: ' -' })
        || validator.isAlpha(value, 'de-DE', { ignore: ' -' })) {
          return value;
        }
        throw new Error('Invalid characters');
      },
    },
  },
});

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

// curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn", "email":"sVen@Mind-probe.com"}' http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Svena", "lastName":"Kohna", "email":"sVen2@mMind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Svenb", "lastName":"Kohnb", "email":"sVenb@mMind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Svend", "lastName":"Kohnd", "email":"sVen3@mMind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Svene", "lastName":"Kohne", "email":"sVene@mind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"Sven", "lastName":"Kohn!", "email":"sVen@Mind-probe..com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
adminRouter.post(
  '/user/add',
  checkMongoConnection,
  validatePostRequest(userValidationSchema),
  async (req, res) => {
    // At this point guaranteed:
    // There is a connection to the MongoDB
    // The input data is valid and contains all required fields
    const emailExists = await userModelMethods.checkExistingEmail(req.body.email);

    if (emailExists) {
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

    try {
      await userModelMethods.addUser(req.body);

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

adminRouter.get('/', (req, res) => {
  res.json({ username: 'mindprobesven' });
});

module.exports = adminRouter;
