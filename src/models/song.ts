import { IAudioMetadata } from 'music-metadata/lib/type';

import { Dictionary } from '../interfaces/common';
import { ISong } from '../interfaces/song';
import {
  MysqlModel,
  tableName,
  fieldMap,
  primaryKey
} from '../lib/mysql-model';


const FIELD_MAP: Dictionary<string> = {
  id: 'id',
  title: 'title',
  albumId: 'album_id',
  artistId: 'artist_id',
  filename: 'filename',
  duration: 'duration',
  track: 'track',
  disc: 'disc',
  year: 'year',
  createdAt: 'created',
  addedBy: 'added_by'
};

@tableName('songs')
@fieldMap(FIELD_MAP)
@primaryKey('id')
export class SongModel extends MysqlModel implements ISong {
  public id: number;
  public title: string;
  public albumId: number;
  public artistId: number;
  public filename: string;
  public duration: number;
  public track?: number;
  public disc?: number;
  public year?: number;
  public createdAt: number;
  public addedBy?: number;

  public static create(): SongModel {
    return new SongModel();
  }

  public static createFromId3Tags(id3Data: IAudioMetadata): SongModel {
    const { common } = id3Data;
    const retVal = new SongModel();

    retVal.createdAt = Date.now();
    retVal.duration = Math.ceil(id3Data.format.duration);
    retVal.title = common.title;
    retVal.track = common.track.of;
    retVal.disc = common.disk.of;
    retVal.year = common.year;

    return retVal;
  }
}