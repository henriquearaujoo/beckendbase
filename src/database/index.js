import Sequelize from 'sequelize';
import dataBaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';

const models = [File, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
