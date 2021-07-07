const { checkSchema } = require('express-validator');

const idValidationSchema = checkSchema({
  id: {
    trim: true,
    isLength: {
      options: { min: 24, max: 24 },
      errorMessage: 'ObjectID must be a 24 byte hex string',
      bail: true,
    },
    isAlphanumeric: {
      errorMessage: 'ObjectID must be a 24 byte hex string',
      bail: true,
    },
  },
});

module.exports = idValidationSchema;
