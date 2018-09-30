import * as express from 'express';

export type RouteHandler = (req: express.Request) => any;

export interface IRouteMap {
  [routePath: string]: RouteHandler;
}