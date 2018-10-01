import * as express from 'express';
import { UploadedFile } from 'express-fileupload';
import * as mm from 'music-metadata';

import { RouteMap } from '../interfaces/route';
import { Controller } from '../lib/controller';
import { MysqlDb } from '../lib/mysql-db';
import { S3 } from '../lib/s3';
import { SongModel } from '../models/song';
import { IAudioMetadata } from 'music-metadata/lib/type';
import { AlbumModel } from '../models/album';

export class SongController extends Controller {
  private s3: S3;

  constructor(db: MysqlDb, s3: S3) {
    super(db);

    this.s3 = s3;
  }

  public static create(db: MysqlDb, s3: S3): SongController {
    return new SongController(db, s3);
  }

  public getRouteMap(): RouteMap {
    return {
      'get:/songs': this.getSongs.bind(this),
      'get:/song/:id': this.getSong.bind(this),
      'post:/song': this.postSong.bind(this)
    };
  }

  public async getSongs(req: express.Request): Promise<any> {
    return await SongModel.selectAll(this.db);
  }

  public async getSong(req: express.Request): Promise<any> {
    return await SongModel.selectById(this.db, req.params.id);
  }

  public async postSong(req: express.Request): Promise<any> {
    const songUpload: UploadedFile = <UploadedFile>req.files.songUpload;
    let song = null;
    let album = null;
    if (songUpload) {
      const id3Tags = await this._getId3Tags(songUpload.data);
      if (id3Tags) {
        album = await AlbumModel.getById3Tags(id3Tags, this.db);
        song = SongModel.createFromId3Tags(id3Tags, songUpload.name, album);
        song.albumId = album.id;
        await song.sync(this.db, this.s3, songUpload.data);
      }
    }
    return song;
  }

  private async _getId3Tags(mp3Buffer: Buffer): Promise<IAudioMetadata> {
    return await mm.parseBuffer(mp3Buffer, 'audio/mpeg');
  }

}