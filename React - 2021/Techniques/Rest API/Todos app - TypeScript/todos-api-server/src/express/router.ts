/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import path from 'path';
import express from 'express';

import { ENV_TYPE, EXPRESS_PORT } from '../config/config';

console.log('Loaded router module');

const app = express();

/*
curl -X GET -H "Accept: application/json" http://127.0.0.1:5000
*/
/* app.get('/', (req, res) => {
  console.log('Request');
  res.sendStatus(200);
}); */

/** Starts the Express ExpressServer and listens on the configured port. */
/* export default function startExpressExpressServer(): void {
  app.listen(EXPRESS_PORT, () => {
    console.log(`${ENV_TYPE} ExpressServer is listening on port ${EXPRESS_PORT}!`);
  });
} */

export default class ExpressServer {
  private static server: ExpressServer;

  private express;

  private constructor() {
    this.express = express();
  }

  private configure() {
    this.express.get('/', (req, res) => {
      console.log('Request');
      res.sendStatus(200);
    });
  }

  static start(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof this.server === 'undefined') {
        this.server = new ExpressServer();
        this.server.configure();

        try {
          this.server.express.listen(EXPRESS_PORT, () => {
            console.log(`${ENV_TYPE} server is listening on port ${EXPRESS_PORT}!`);
            resolve();
          });
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.name);
            console.log(error.message);
          }
        }
      }
    });
  }
}
