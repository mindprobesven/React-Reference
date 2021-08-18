// import validator from 'validator';
import { checkSchema } from 'express-validator';

const userQuerySchema = checkSchema({
  searchFor: {
    in: ['query'],
    optional: true,
    isLength: {
      options: { min: 1, max: 25 },
      errorMessage: 'Invalid length',
      bail: true,
    },
    isAlpha: {
      options: ['en-US', { ignore: '-' }],
      errorMessage: 'Invalid characters',
      bail: true,
    },
  },
  searchTerm: {
    in: ['query'],
    optional: true,
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Invalid length',
      bail: true,
    },
    isAlpha: {
      options: ['en-US', { ignore: '-' }],
      errorMessage: 'Invalid characters',
      bail: true,
    },
  },
  sortBy: {
    in: ['query'],
    optional: true,
    isLength: {
      options: { min: 1, max: 25 },
      errorMessage: 'Invalid length',
      bail: true,
    },
    isAlpha: {
      options: ['en-US', { ignore: '-' }],
      errorMessage: 'Invalid characters',
      bail: true,
    },
  },
  sortOrder: {
    in: ['query'],
    optional: true,
    toLowerCase: true,
    isLength: {
      options: { min: 3, max: 4 },
      errorMessage: 'Invalid length',
      bail: true,
    },
    isIn: {
      options: [['asc', 'desc']],
      errorMessage: 'Invalid value',
      bail: true,
    },
  },
});

export default userQuerySchema;
