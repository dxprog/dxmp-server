import { IAudioMetadata } from 'music-metadata/lib/type';
import { Dictionary, IAlbum } from 'dxmp-common';

import { MysqlDb } from '../lib/mysql-db';
import {
  MysqlModel,
  tableName,
  fieldMap,
  primaryKey
} from '../lib/mysql-model';

const TABLE_NAME = 'albums';

const FIELD_MAP: Dictionary<string> = {
  id: 'id',
  title: 'title',
  wallpaper: 'wallpaper',
  art: 'art'
};

@tableName(TABLE_NAME)
@fieldMap(FIELD_MAP)
@primaryKey('id')
export class AlbumModel extends MysqlModel implements IAlbum {
  public id: number;
  public title: string;
  public wallpaper: boolean;
  public art: boolean;

  constructor() {
    super();

    this.wallpaper = false;
    this.art = false;
  }

  public mysqlCopyFromRow(row: Dictionary<any>) {
    super.mysqlCopyFromRow(row);
    // Forcing type coercion
    this.wallpaper = !!this.wallpaper;
    this.art = !!this.art;
  }

  public static create() {
    return new AlbumModel();
  }

  /**
   * Searches for an album of identical title and, if no match, returns
   * a new AlbumModel object with the supplied tags.
   *
   * @param id3Tags The ID3 tags to query against/build new object from
   */
  public static async getById3Tags(id3Tags: IAudioMetadata, db: MysqlDb): Promise<AlbumModel> {
    let retVal = new AlbumModel();
    retVal.title = id3Tags.common.album;

    const query = `SELECT * FROM \`${TABLE_NAME}\` WHERE \`title\` LIKE :title LIMIT 1`;
    const result = await db.query(query, { title: id3Tags.common.album });
    if (result.hasContent) {
      retVal.mysqlCopyFromRow(result.rows[0]);
    } else {
      await retVal.sync(db);
    }

    return retVal;
  }
}