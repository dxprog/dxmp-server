import { App } from './src/app';
import { IAppConfig } from './src/interfaces/config';
import { Controller } from './src/interfaces/controller';
import { SongController } from './src/controllers/song';
import { MysqlDb } from './src/lib/mysql-db';

import config from './config';

interface ControllerPrototype {
  new(): Controller
};

const ACTIVE_CONTROLLERS: Array<ControllerPrototype> = [
  SongController
];

async function boot(appConfig: IAppConfig) {
  const db = new MysqlDb();
  await db.connect(appConfig.mysql);

  const app = new App(appConfig.http);
  const activeControllers = ACTIVE_CONTROLLERS.forEach((ControllerClass: ControllerPrototype) => {
    const controller = new ControllerClass();
    app.addController(controller);
  });

  await app.start();

  console.log('listening on', appConfig.http.port);
}

boot(config);