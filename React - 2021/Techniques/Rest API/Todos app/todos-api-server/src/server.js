const startExpressServer = require('./express/connection');
const mongoConnection = require('./mongo/connection');

const init = async () => {
  await startExpressServer();
  await mongoConnection.connect();
};

init();
