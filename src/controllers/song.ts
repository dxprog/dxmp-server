import * as express from 'express';

import { Controller } from '../interfaces/controller';
import { RouteMap } from '../interfaces/route';
import { MysqlDb } from '../lib/mysql-db';
import { SongModel } from '../models/song';

export class SongController extends Controller {
  public static create(db: MysqlDb): SongController {
    return new this(db);
  }

  public async getSongs(req: express.Request): Promise<any> {
    return await SongModel.selectAll(this.db);
  }

  public async getSong(req: express.Request): Promise<any> {
    return await SongModel.selectById(this.db, req.params.id);
  }

  public getRouteMap(): RouteMap {
    return {
      'get:/songs': this.getSongs.bind(this),
      'get:/song/:id': this.getSong.bind(this)
    };
  }
}