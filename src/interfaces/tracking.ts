export enum TrackingType {
  START = 1,
  FINISH = 2,
  SKIP = 3
}

export interface ITracking {
  songId: number;
  userId: number;
  type: TrackingType;
  createdAt: number;
}