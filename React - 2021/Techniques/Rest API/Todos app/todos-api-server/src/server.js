const startExpressServer = require('./express/router');
const mongoConnection = require('./mongo/connection');

const init = async () => {
  await startExpressServer();
  await mongoConnection.connect();
};

init();
