import * as express from 'express';

import { Controller } from '../lib/controller';
import { RouteMap } from '../interfaces/route';
import { MysqlDb } from '../lib/mysql-db';
import { AlbumModel } from '../models/album';

export class AlbumController extends Controller {
  public static create(db: MysqlDb): AlbumController {
    return new AlbumController(db);
  }

  public async getAlbums(req: express.Request): Promise<any> {
    return await AlbumModel.selectAll(this.db);
  }

  public async getAlbum(req: express.Request): Promise<any> {
    return await AlbumModel.selectById(this.db, req.params.id);
  }

  public getRouteMap(): RouteMap {
    return {
      'get:/albums': this.getAlbums.bind(this),
      'get:/album/:id': this.getAlbum.bind(this)
    };
  }
}