import * as express from 'express';

import { IController } from '../interfaces/controller';
import { RouteMap } from '../interfaces/route';

export class SongController implements IController {
  public getSongs(req: express.Request): any {
    return {};
  }

  public getRouteMap(): RouteMap {
    return {
      'get:/songs': this.getSongs.bind(this)
    };
  }
}