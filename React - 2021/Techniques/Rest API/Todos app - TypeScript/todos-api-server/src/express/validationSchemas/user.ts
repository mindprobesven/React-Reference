import validator from 'validator';
import { checkSchema } from 'express-validator';

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
      options: (value: string) => {
        if (validator.isAlphanumeric(value, 'en-US', { ignore: ' -' })
        || validator.isAlphanumeric(value, 'es-ES', { ignore: ' -' })
        || validator.isAlphanumeric(value, 'de-DE', { ignore: ' -' })) {
          return true;
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
      options: (value: string) => {
        if (validator.isAlphanumeric(value, 'en-US', { ignore: ' -' })
        || validator.isAlphanumeric(value, 'es-ES', { ignore: ' -' })
        || validator.isAlphanumeric(value, 'de-DE', { ignore: ' -' })) {
          return true;
        }
        throw new Error('Invalid characters');
      },
    },
  },
  validated: {
    optional: true,
    custom: {
      options: (value: boolean) => {
        if (validator.isBoolean(value.toString())) {
          return true;
        }
        throw new Error('Must be a boolean');
      },
    },
  },
});

export default userValidationSchema;
