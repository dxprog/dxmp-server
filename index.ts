import { App } from './src/app';
import { SongController } from './src/controllers/song';

const app = new App();
const songController = new SongController();

app.addController(songController);