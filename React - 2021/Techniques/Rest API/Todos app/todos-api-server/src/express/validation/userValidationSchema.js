const validator = require('validator');
const { checkSchema } = require('express-validator');

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

module.exports = userValidationSchema;
