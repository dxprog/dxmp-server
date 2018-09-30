import * as express from 'express';
import { UploadedFile } from 'express-fileupload';
import * as mm from 'music-metadata';

import { Controller } from '../interfaces/controller';
import { RouteMap } from '../interfaces/route';
import { MysqlDb } from '../lib/mysql-db';
import { SongModel } from '../models/song';
import { IAudioMetadata } from 'music-metadata/lib/type';

export class SongController extends Controller {
  public static create(db: MysqlDb): SongController {
    return new SongController(db);
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
    if (songUpload) {
      const id3Tags = await this._getId3Tags(songUpload.data);
      if (id3Tags) {
        song = SongModel.createFromId3Tags(id3Tags);
      }
    }
    return song;
  }

  private async _getId3Tags(mp3Buffer: Buffer): Promise<IAudioMetadata> {
    return await mm.parseBuffer(mp3Buffer, 'audio/mpeg');
  }
}