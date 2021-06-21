const { ENV } = require('../config/config');

const cl = (message) => {
  if (ENV === 'development') {
    console.log(message);
  }
};

module.exports = cl;
