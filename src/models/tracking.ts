import { Dictionary } from '../interfaces/common';
import { ITracking, TrackingType } from '../interfaces/tracking';
import {
  MysqlModel,
  tableName,
  fieldMap
} from '../lib/mysql-model';

const FIELD_MAP: Dictionary<string> = {
  songId: 'song_id',
  type: 'type',
  userId: 'user_id',
  createdAt: 'date'
};

@tableName('tracking')
@fieldMap(FIELD_MAP)
export class TrackingModel extends MysqlModel implements ITracking {
  public songId: number;
  public type: TrackingType;
  public userId: number;
  public createdAt: number;

  constructor() {
    super();
    this.createdAt = Date.now();
  }

  /**
   * Instantiates a TrackingModel from an ITracking object
   *
   * @param obj The ITracking object to create from
   */
  static createFromObject(obj: ITracking): TrackingModel {
    const retVal: TrackingModel = new TrackingModel();
    retVal.songId = obj.songId;
    retVal.userId = obj.userId;
    retVal.type = obj.type;
    retVal.createdAt = obj.createdAt || retVal.createdAt;
    return retVal;
  }
}