/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const process = require('process');
const mongoose = require('mongoose');

const { MONGO_URI, MONGO_OPTIONS } = require('../config/config');
const logger = require('../utils/logger');

const MongoConnection = (() => {
  console.log('Creating MongoConnectionClass');

  const db = mongoose.connection;

  const privateProps = {
    isConnected: false,
  };

  /** Catch database `readyState` change events and handle them. */
  const handleReadyStateStatusChange = () => {
    switch (db.readyState) {
    case 0:
      privateProps.isConnected = false;

      logger.mongo.log({
        level: 'info',
        message: 'Disconnected!',
      });
      break;
    case 1:
      privateProps.isConnected = true;

      logger.mongo.log({
        level: 'info',
        message: 'Connected!',
      });
      break;
    case 2:
      logger.mongo.log({
        level: 'info',
        message: 'Connecting...',
      });
      break;
    case 3:
      logger.mongo.log({
        level: 'info',
        message: 'Disconnecting...',
      });
      break;
    case 4:
      logger.mongo.log({
        level: 'error',
        message: 'Invalid credentials!',
      });
      break;
    default:
      logger.mongo.log({
        level: 'error',
        message: 'Unknown readyState!',
      });
    }
  };

  /** Catch database `connection` change events and handle them. */
  const handleConnectionStatusChange = (event) => {
    switch (event) {
    case 'reconnected':
      logger.mongo.log({
        level: 'info',
        message: 'Reconnected to database successfully!',
      });
      break;
    case 'reconnectFailed':
      logger.mongo.log({
        level: 'error',
        message: 'Reconnect failed!',
      });
      break;
    case 'error':
      logger.mongo.log({
        level: 'error',
        message: 'A connection error ocurred!',
      });
      break;
    default:
      logger.mongo.log({
        level: 'error',
        message: 'Unknown error event!',
      });
    }
  };

  db.on('connecting', handleReadyStateStatusChange)
    .on('connected', handleReadyStateStatusChange)
    .on('disconnecting', handleReadyStateStatusChange)
    .on('disconnected', handleReadyStateStatusChange)
    .on('invalid credentials', handleReadyStateStatusChange);

  db.on('reconnected', () => handleConnectionStatusChange('reconnected'))
    .on('reconnectFailed', () => handleConnectionStatusChange('reconnectFailed'))
    .on('error', () => handleConnectionStatusChange('error'));

  /** Catch `process` events if the app is restarted or exited and gracefully close the database connection */
  const gracefulExit = () => {
    db.close()
      .then(() => {
        logger.mongo.log({
          level: 'info',
          message: 'Graceful exit initiated. Connection to MongoDB closed.',
        });
        process.exit(0);
      })
      .catch((error) => console.log(error));
  };

  process.on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit)
    .on('SIGUSR2', gracefulExit);

  /** MongoConnectionClass */
  class MongoConnectionClass {
    /** Establishes a connection to the MongoDB. */
    connect() {
      return new Promise((resolve) => {
        mongoose.connect(MONGO_URI, MONGO_OPTIONS)
          .then(() => resolve(true))
          .catch((error) => {
            logger.mongo.log({
              level: 'error',
              message: `${error.name} ${error.message}`,
            });
          });
      });
    }

    /** Returns `true` if connected to MongoDB, otherwise `false`. */
    get isConnected() {
      return privateProps.isConnected;
    }
  }

  return MongoConnectionClass;
})();

const mongoConnection = new MongoConnection();

module.exports = mongoConnection;
