import express from 'express';
import path from 'path';
import routes from './routes';

import dataBase from './database';

class App {
  constructor() {
    this.server = express();

    this.middleswares();
    this.routes();
  }

  middleswares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
