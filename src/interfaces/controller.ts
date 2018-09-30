import { RouteMap } from './route';
import { MysqlDb } from '../lib/mysql-db';

export abstract class Controller {
  protected db: MysqlDb;

  constructor(db: MysqlDb) {
    this.db = db;
  }

  /**
   * Extended object returns an instantiated version of itself.
   *
   * @todo Kill this dead when I can typescript around "new abstract" error
   * @param args Function arguments
   */
  public static create(...args: Array<any>): Controller {
    throw new Error('[Controller] "create" method must be overridden by the extending class');
  }

  public getRouteMap(): RouteMap {
    throw new Error('[Controller] "getRouteMap" method must be overridden by the extending class');
  }
}