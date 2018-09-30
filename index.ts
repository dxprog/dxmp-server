import { App } from './src/app';
import { Controller } from './src/interfaces/controller';
import { SongController } from './src/controllers/song';
import { MysqlDb } from './src/lib/mysqldb';

import config from './config';

interface ControllerPrototype {
  new(): Controller
};

const ACTIVE_CONTROLLERS: Array<ControllerPrototype> = [
  SongController
];

const db = new MysqlDb();
db.connect(config.mysql).then(() => {
  const app = new App();
  const activeControllers = ACTIVE_CONTROLLERS.forEach((ControllerClass: ControllerPrototype) => {
    const controller = new ControllerClass();
    app.addController(controller);
  });
}).catch(err => {
  console.error(err);
});