import * as mysql from 'mysql';
import { Dictionary } from '../interfaces/common';

export interface IQueryResult {
  rows?: Array<Dictionary<any>>;
  fields: Array<mysql.FieldInfo>;
}

export class MysqlDb {
  private _conn: mysql.Connection;

  public async connect(options: mysql.ConnectionConfig) {
    this._conn = mysql.createConnection(options);

    return new Promise((resolve, reject) => {
      this._conn.config.queryFormat = this._queryFormat.bind(this);
      this._conn.connect(err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  public async query(query: string, params?: Dictionary<any>): Promise<IQueryResult> {
    return new Promise<IQueryResult>((resolve, reject) => {
      this._conn.query(query, params, (err, rows: Array<Dictionary<any>>, fields: Array<mysql.FieldInfo>) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({ rows, fields });
      });
    });
  }

  private _queryFormat(query: string, params?: Dictionary<any>) {
    if (!params) {
      return query;
    }

    return query.replace(/\:(\w+)/g, (token: string, key: string) => {
      if (params.hasOwnProperty(key)) {
        token = this._conn.escape(params[key]);
      }
      return token;
    });
  }
}