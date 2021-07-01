/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');
const validator = require('validator');
const {
  body, validationResult, ValidationChain, checkSchema,
} = require('express-validator');

const userModelExport = require('../../mongo/schemas/user');
const logger = require('../../utils/logger');

const adminRouter = express.Router();

adminRouter.use(express.json());

const validateUser = (validations) => async (req, res, next) => {
  // await Promise.all(validations.map((validation) => validation.run(req)));
  await validations.run(req);

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
};

// curl -X POST --data '{"firstName":" Sveñ än!3", "lastName":"Kohn", "email":" sVen@Mind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":" Sveñ ü", "lastName":"Kohn", "email":" sVen@Mind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":" Sveä", "lastName":"Kohn", "email":" sVen@Mind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":" Sven", "lastName":"Kohn", "email":" sVen@Mind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
// curl -X POST --data '{"firstName":"", "lastName":"Kohn", "email":" sVen@Mind-probe.com"}' -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:5000/admin/user/add
adminRouter.post(
  '/user/add',
  validateUser(
    checkSchema({
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
        /* isAlpha: {
          options: ['en-US', { ignore: ' -' }],
          errorMessage: 'Invalid characters',
        }, */
        custom: {
          options: (value) => {
            console.log(`Options custom ${value}`);
            console.log(validator.isAlpha(value, 'en-US', { ignore: ' -' }));
            console.log(validator.isAlpha(value, 'es-ES', { ignore: ' -' }));
            console.log(validator.isAlpha(value, 'de-DE', { ignore: ' -' }));

            if (validator.isAlpha(value, 'en-US', { ignore: ' -' })
            || validator.isAlpha(value, 'es-ES', { ignore: ' -' })
            || validator.isAlpha(value, 'de-DE', { ignore: ' -' })) {
              return value;
            }
            throw new Error('Invalid characters');
          },
        },
      },
    }),
  ),
  async (req, res) => {
    console.log(req.body);
    res.sendStatus(200);

    /* try {
    const savedUserDoc = await userModelExport.addUser(sampleData);
    console.log(savedUserDoc);
    res.sendStatus(200);
  } catch (error) {
    logger.mongo.log({
      level: 'error',
      message: `Schema validation failed - ${error.message} - ${req.originalUrl} - ${req.ip} - ${req.get('user-agent')}`,
    });
    res.status(403).send('403 - Validation Failed');
  } */

  /* const allowedContentType = 'application/json';

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
  } */
  },
);

adminRouter.get('/', (req, res) => {
  res.json({ username: 'mindprobesven' });
});

module.exports = adminRouter;
