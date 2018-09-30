export interface ISong {
  id: number;
  title: string;
  albumId: number;
  artistId: number;
  filename: string;
  duration: number;
  track?: number;
  disc?: number;
  year?: number;
  createdAt: number;
  addedBy?: number;
}