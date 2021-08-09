/* eslint-disable max-len */
/* eslint-disable indent */

import ExpressServer from './express/app';

const initAPIServer = async () => {
  const isListening = await ExpressServer.start();

  if (isListening) {
    console.log('Listening...');
  } else {
    console.log('NOT Listening!');
  }
};

void initAPIServer();
