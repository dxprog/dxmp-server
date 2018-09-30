import * as express from 'express';

import { Dictionary } from './common/dictionary';

export type RouteHandler = (req: express.Request) => any;

export type RouteMap = Dictionary<RouteHandler>;