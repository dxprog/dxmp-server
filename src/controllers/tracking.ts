import * as express from 'express';
import { Dictionary, isNumeric } from 'dxmp-common';

import { Controller } from '../lib/controller';
import { RouteMap } from '../interfaces/route';
import { MysqlDb } from '../lib/mysql-db';
import { TrackingModel } from '../models/tracking';

export class TrackingController extends Controller {
  public static create(db: MysqlDb): TrackingController {
    return new TrackingController(db);
  }

  public getRouteMap(): RouteMap {
    return {
      'post:/tracking': this.postTracking.bind(this)
    };
  }

  public async postTracking(req: express.Request): Promise<any> {
    const retVal: Dictionary<any> = {
      error: false
    };
    if (this._verifyPostFields(req.body)) {
      const trackingModel = TrackingModel.createFromObject(req.body);
      await trackingModel.sync(this.db);
    } else {
      retVal.error = 'Missing or incorrect fields';
    }
    return retVal;
  }

  private _verifyPostFields(fields: Dictionary<any>): boolean {
    let retVal = true;
    retVal = retVal && isNumeric(fields.songId);
    retVal = retVal && isNumeric(fields.userId);
    retVal = retVal && isNumeric(fields.type);
    return retVal;
  }
}