import * as express from 'express';

import { IController } from '../interfaces/controller';
import { IRouteMap } from '../interfaces/route';

export class SongController implements IController {
  public getSongs(req: express.Request): any {
    return {};
  }

  public getRouteMap(): IRouteMap {
    return {
      'get:/songs': this.getSongs.bind(this)
    };
  }
}