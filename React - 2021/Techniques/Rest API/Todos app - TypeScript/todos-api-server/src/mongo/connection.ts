/* eslint-disable indent */
/* eslint-disable max-len */
import process from 'process';
import mongoose from 'mongoose';

import { MONGO_URI, MONGO_OPTIONS } from '../config/config';

import logger from '../utils/logger';

class Mongo {
  private static mongo: Mongo;

  private isConnected: boolean;

  private constructor() {
    this.isConnected = false;
  }

  private initEventListeners = (): void => {
    const db = mongoose.connection;

    /** Catch database `readyState` change events and handle them. */
    const handleReadyStateStatusChange = () => {
      switch (db.readyState) {
        case 0:
          this.isConnected = false;

          logger.mongo.log({
            level: 'info',
            message: 'Disconnected!',
          });
          break;
        case 1:
          this.isConnected = true;

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
    const handleConnectionStatusChange = (event: string) => {
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
        .catch((error: Error) => { throw error; });
    };

    process.on('SIGINT', gracefulExit)
      .on('SIGTERM', gracefulExit)
      .on('SIGUSR2', gracefulExit);
  };

  private connectToDatabase = (): Promise<boolean | Error> => (
    new Promise((resolve, reject) => {
      mongoose.connect(MONGO_URI, MONGO_OPTIONS)
        .then(() => resolve(true))
        .catch((error) => {
          if (error instanceof Error) {
            logger.mongo.log({
              level: 'error',
              message: `${error.name} ${error.message}`,
            });
            reject(error);
          }
        });
    })
  );

  static get isConnected(): boolean {
    if (this.mongo instanceof Mongo) {
      return this.mongo.isConnected;
    }
    return false;
  }

  static connect(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof this.mongo === 'undefined') {
        this.mongo = new Mongo();
        this.mongo.initEventListeners();
        this.mongo.connectToDatabase().then(() => resolve(true)).catch(() => resolve(false));
      }
    });
  }
}

export default Mongo;
