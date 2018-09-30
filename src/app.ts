import * as express from 'express';

import { IController } from './interfaces/controller';
import { RouteMap, RouteHandler } from './interfaces/route';

const AVAILABLE_ROUTE_METHODS: Array<string> = [ 'all', 'get', 'post', 'update', 'delete' ];

export class App {
  private app: express.Express;

  constructor() {
    this.app = express();
  }

  public addController(controller: IController) {
    const routeMap: RouteMap = controller.getRouteMap();
    Object.keys(routeMap).forEach((routePath: string) => {
      const { app } = this;
      const routeTokens: Array<string> = routePath.split(':', 2);
      const routeMethod: string = routeTokens.length === 1 ? 'all' : routeTokens.shift();
      const routeUrl: string = routeTokens.shift();
      const routeHandler: express.RequestHandler = this._handleRequest(routeMap[routePath]);

      if (!AVAILABLE_ROUTE_METHODS.includes(routeMethod)) {
        throw new Error(`Invalid route method: ${routePath}`);
      }

      // Would prefer to: app[routeMethod](routeUrl, routeHandler);
      // Need to figure out how to TS that...
      switch (routeMethod) {
        case 'get':
          app.get(routeUrl, routeHandler);
          break;
        case 'post':
          app.post(routeUrl, routeHandler);
          break;
        case 'update':
          app.post(routeUrl, routeHandler);
          break;
        case 'delete':
          app.post(routeUrl, routeHandler);
          break;
        default:
          app.all(routeUrl, routeHandler);
          break;
      }
    });
  }

  /**
   * Curries a route handler with an express request handler. The
   * route handler's output is sent as JSON.
   *
   * @param handler The route handler to invoke
   */
  private _handleRequest(handler: RouteHandler): express.RequestHandler {
    return (req: express.Request, res: express.Response): void => {
      res.json(handler(req));
    };
  }
}