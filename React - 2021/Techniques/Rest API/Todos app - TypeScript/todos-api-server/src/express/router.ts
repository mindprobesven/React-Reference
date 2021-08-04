// import path from 'path';
import express from 'express';

import { ENV_TYPE, EXPRESS_PORT } from '../config/config';

const app = express();

/*
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000
*/
app.get('/', (req, res) => {
  console.log('Request');
  res.sendStatus(200);
});

/** Starts the Express server and listens on the configured port. */
export default function startExpressServer(): void {
  app.listen(EXPRESS_PORT, () => {
    console.log(`${ENV_TYPE} server is listening on port ${EXPRESS_PORT}!`);
  });
}
