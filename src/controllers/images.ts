import * as express from 'express';
import { createPerma, IAlbum } from 'dxmp-common';
import * as request from 'request-promise-native';

import config from '../../config';
import { Controller } from '../lib/controller';
import { RouteMap } from '../interfaces/route';
import { AlbumModel } from '../models/album';
import { MysqlDb } from '../lib/mysql-db';

const IMAGES_BASE_URL = `http://${config.aws.bucket}.s3.amazonaws.com/${config.aws.imagesPath}/`;

export class ImagesController extends Controller {
  public static create(db: MysqlDb) {
    return new ImagesController(db);
  }

  public getRouteMap(): RouteMap {
    return {
      'get:/images/art/:albumId.jpg': this.getAlbumArt.bind(this)
    };
  }

  public async getAlbumArt(req: express.Request, res: express.Response): Promise<void> {
    const albumId: number = parseInt(req.params.albumId, 36);
    const album: AlbumModel = <AlbumModel> await AlbumModel.selectById(this.db, albumId);

    let redirectUrl = 'http://dxmp.us/images/default-album.png';
    let statusCode = 302;
    if (album && album.art) {
      const imageUrl = `${IMAGES_BASE_URL}${createPerma(album.title)}-album-art.jpg`;
      const imageExists = await this.verifyImageExists(imageUrl);
      if (imageExists) {
        statusCode = 302;
        redirectUrl = imageUrl;
      }
    }
    res.status(statusCode);
    res.header('Location', redirectUrl);
  }

  public async getAlbumWallpaper(req: express.Request, res: express.Response): Promise<void> {
    const albumId: number = parseInt(req.params.albumId, 36);
    const album: AlbumModel = <AlbumModel> await AlbumModel.selectById(this.db, albumId);

    let redirectUrl = '';
    let statusCode = 404;
    if (album && album.art) {
      const imageUrl = `${IMAGES_BASE_URL}${createPerma(album.title)}-album-wallpaper.jpg`;
      const imageExists = await this.verifyImageExists(imageUrl);
      if (imageExists) {
        statusCode = 302;
        redirectUrl = imageUrl;
      }
    }
    res.status(statusCode);
    res.header('Location', redirectUrl);
  }

  private async verifyImageExists(url: string): Promise<boolean> {
    let retVal: boolean = false;
    try {
      await request(url, { method: 'HEAD' });
      // Headers came back clean, use the generated URL
      retVal = true;
    } catch(err) {}
    return retVal;
  }
}