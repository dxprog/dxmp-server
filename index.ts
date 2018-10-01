import { App } from './src/app';
import { IAppConfig } from './src/interfaces/config';
import { SongController } from './src/controllers/song';
import { AlbumController } from './src/controllers/album';
import { Controller } from './src/lib/controller';
import { MysqlDb } from './src/lib/mysql-db';
import { S3 } from './src/lib/s3';

import config from './config';

type ControllerPrototype = typeof Controller;

const ACTIVE_CONTROLLERS: Array<ControllerPrototype> = [
  SongController,
  AlbumController
];

async function boot(appConfig: IAppConfig) {
  const db = new MysqlDb();
  await db.connect(appConfig.mysql);
  console.log('Connected to database: ', appConfig.mysql.database);

  const s3 = new S3(appConfig.aws);

  const app = new App(appConfig.http);
  const activeControllers = ACTIVE_CONTROLLERS.forEach(
    <T extends ControllerPrototype>(ControllerClass: T) => {
      console.log('Adding controller', ControllerClass.name);
      const controller: Controller = ControllerClass.create(db, s3);
      app.addController(controller);
    }
  );

  await app.start();

  console.log('Listening on', appConfig.http.port);
}

boot(config);