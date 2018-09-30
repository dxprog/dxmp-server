import { Dictionary } from '../interfaces/common';
import { IAlbum } from '../interfaces/album';
import {
  MysqlModel,
  tableName,
  fieldMap,
  primaryKey
} from '../lib/mysql-model';

const FIELD_MAP: Dictionary<string> = {
  id: 'id',
  title: 'title',
  wallpaper: 'wallpaper',
  art: 'art'
};

@tableName('albums')
@fieldMap(FIELD_MAP)
@primaryKey('id')
export class AlbumModel extends MysqlModel implements IAlbum {
  public id: number;
  public title: string;
  public wallpaper: boolean;
  public art: boolean;

  public mysqlCopyFromRow(row: Dictionary<any>) {
    super.mysqlCopyFromRow(row);
    // Forcing type coercion
    this.wallpaper = !!this.wallpaper;
    this.art = !!this.art;
  }

  public static create() {
    return new AlbumModel();
  }
}