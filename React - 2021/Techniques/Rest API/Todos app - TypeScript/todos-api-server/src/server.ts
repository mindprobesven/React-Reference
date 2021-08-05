import ExpressServer from './express/router';

void (async () => {
  await ExpressServer.start();
  console.log('Here');
})();
