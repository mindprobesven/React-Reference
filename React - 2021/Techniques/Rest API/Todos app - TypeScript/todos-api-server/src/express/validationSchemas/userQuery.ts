import validator from 'validator';
import { checkSchema } from 'express-validator';

const userQuerySchema = checkSchema({
  searchFor: {
    in: ['query'],
    optional: true,
    isLength: {
      options: { max: 25 },
      errorMessage: 'Too long',
      bail: true,
    },
    custom: {
      options: (value: string) => {
        if (validator.isAlphanumeric(value, 'en-US', { ignore: '-' })) {
          return true;
        }
        throw new Error('Invalid characters');
      },
    },
  },
  searchTerm: {
    in: ['query'],
    optional: true,
    isLength: {
      options: { max: 50 },
      errorMessage: 'Too long',
      bail: true,
    },
    custom: {
      options: (value: string) => {
        if (validator.isAlphanumeric(value, 'en-US', { ignore: '-' })) {
          return true;
        }
        throw new Error('Invalid characters');
      },
    },
  },
});

export default userQuerySchema;
