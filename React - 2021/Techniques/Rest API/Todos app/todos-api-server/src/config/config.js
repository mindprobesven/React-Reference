const ENV = process.env.NODE_ENV;
const ENV_TYPE = ENV.charAt(0).toUpperCase() + ENV.slice(1);

const EXPRESS_PORT = 5000;

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4,
  poolSize: 5,
  serverSelectionTimeoutMS: 3000,
  heartbeatFrequencyMS: 5000,
};
const MONGO_DB = 'todos-app';
const MONGO_URI = `mongodb://localhost:27017/${MONGO_DB}`;

module.exports = {
  ENV,
  ENV_TYPE,
  EXPRESS_PORT,
  MONGO_URI,
  MONGO_OPTIONS,
};
