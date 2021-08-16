import { checkSchema } from 'express-validator';

const idValidationSchema = checkSchema({
  id: {
    trim: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'ID must be a 24 byte hex string',
      bail: true,
    },
    isAlphanumeric: {
      errorMessage: 'ID must be a 24 byte hex string',
      bail: true,
    },
  },
});

export default idValidationSchema;
