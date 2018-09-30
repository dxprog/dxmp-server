import { RouteMap } from './route';

export abstract class Controller {
  public getRouteMap(): RouteMap {
    throw new Error('getRouteMap implementation missing');
  }
}