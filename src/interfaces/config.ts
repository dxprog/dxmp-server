import * as mysql from 'mysql';

export interface IHttpConfig {
  port: number;
}

export interface IAppConfig {
  mysql?: mysql.ConnectionConfig;
  http?: IHttpConfig;
  aws?: IAWSConfig;
}

export interface IAWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
  bucket: string;
  songsPath: string;
  imagesPath: string;
}