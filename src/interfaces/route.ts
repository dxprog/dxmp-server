import * as express from 'express';

import { Dictionary } from './common';

export type RouteHandler = (req: express.Request) => any;

export type RouteMap = Dictionary<RouteHandler>;