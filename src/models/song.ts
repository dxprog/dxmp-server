import { IAudioMetadata } from 'music-metadata/lib/type';

import { IAlbum } from '../interfaces/album';
import { Dictionary } from '../interfaces/common';
import { ISong } from '../interfaces/song';
import { MysqlDb } from '../lib/mysql-db';
import {
  MysqlModel,
  tableName,
  fieldMap,
  primaryKey
} from '../lib/mysql-model';
import { createPerma } from '../lib/utils';
import { S3 } from '../lib/s3';


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

  /**
   * Syncs the object to the database with the option of uploading an MP3
   * to the S3 store.
   *
   * @param db The database object
   * @param s3 The S3 object
   * @param mp3Buffer The buffer to write to S3
   */
  public async sync(db: MysqlDb, s3?: S3, mp3Buffer?: Buffer): Promise<void> {
    if (this.filename && s3 && mp3Buffer) {
      await s3.uploadSong(this.filename, mp3Buffer);
    }
    return super.sync(db);
  }

  public static createFromId3Tags(id3Data: IAudioMetadata, filename: string, album: IAlbum): SongModel {
    const { common } = id3Data;
    const retVal = new SongModel();

    retVal.createdAt = Date.now();
    retVal.duration = Math.ceil(id3Data.format.duration);
    retVal.albumId = album.id;
    retVal.title = common.title;
    retVal.track = common.track.of;
    retVal.disc = common.disk.of;
    retVal.year = common.year;
    retVal.filename = retVal._cleanFileName(filename);

    return retVal;
  }

  private _cleanFileName(filename: string) : string {
    const tokens = filename.split('.');
    tokens.pop();
    return `${createPerma(tokens.join('.'))}.mp3`;
  }
}