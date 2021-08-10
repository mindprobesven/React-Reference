/* eslint-disable max-len */
/* eslint-disable indent */

import ExpressServer from './express/app';
import Mongo from './mongo/connection';

const initAPIServer = async () => {
  const isListening = await ExpressServer.start();

  if (isListening) {
    await Mongo.connect();
  }
};

void initAPIServer();
