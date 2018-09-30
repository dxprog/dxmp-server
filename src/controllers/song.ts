import * as express from 'express';

import { Controller } from '../interfaces/controller';
import { RouteMap } from '../interfaces/route';

export class SongController extends Controller {
  public getSongs(req: express.Request): any {
    return {};
  }

  public getRouteMap(): RouteMap {
    return {
      'get:/songs': this.getSongs.bind(this)
    };
  }
}