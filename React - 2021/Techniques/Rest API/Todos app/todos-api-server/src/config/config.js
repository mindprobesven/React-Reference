const ENV = process.env.NODE_ENV;
const ENV_NAME = process.env.NODE_ENV.charAt(0).toUpperCase() + process.env.NODE_ENV.slice(1);

const EXPRESS_PORT = 5000;

module.exports = {
  ENV,
  ENV_NAME,
  EXPRESS_PORT
};
