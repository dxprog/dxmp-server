import { Dictionary } from 'dxmp-common';
import * as express from 'express';

export type RouteHandler = (req: express.Request) => any;

export type RouteMap = Dictionary<RouteHandler>;