export const ENV = process.env.NODE_ENV || 'development';
export const ENV_TYPE = ENV.charAt(0).toUpperCase() + ENV.slice(1);

export const EXPRESS_PORT = 5000;

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4,
  poolSize: 5,
  serverSelectionTimeoutMS: 3000,
  heartbeatFrequencyMS: 5000,
};
export const MONGO_DB = 'todos-app';
export const MONGO_URI = `mongodb://1localhost:27017/${MONGO_DB}`;

/* export = {
  ENV,
  ENV_TYPE,
  EXPRESS_PORT,
  MONGO_URI,
  MONGO_OPTIONS,
}; */

/* module.exports = {
  ENV,
  ENV_TYPE,
  EXPRESS_PORT,
  MONGO_URI,
  MONGO_OPTIONS,
}; */
