import { IAppConfig } from './src/interfaces/config';

const APP_CONFIG: IAppConfig = {
  mysql: {
    host: 'localhost',
    user: 'dxmp-server',
    password: 'dxmp-server-password',
    database: 'dxmp'
  },
  http: {
    port: 4141
  },
  aws: {
    accessKeyId: 'access-key',
    secretAccessKey: 'secret-key',
    bucket: 'dxmp',
    songsPath: 'songs',
    imagesPath: 'images'
  }
};

export default APP_CONFIG;