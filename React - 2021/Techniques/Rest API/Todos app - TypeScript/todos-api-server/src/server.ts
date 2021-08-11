import ExpressServer from './express/app';
import Mongo from './mongo/connection';

import logger from './utils/logger';

const initAPIServer = async () => {
  if (await ExpressServer.start() === 'OK') {
    if (await Mongo.connect() === 'OK') {
      logger.express.log({
        level: 'info',
        message: 'The API server has started successfully!',
      });
    }
  }
};

void initAPIServer();
