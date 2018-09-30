import { App } from './src/app';
import { Controller } from './src/interfaces/controller';
import { SongController } from './src/controllers/song';

interface ControllerPrototype {
  new(): Controller
};

const ACTIVE_CONTROLLERS: Array<ControllerPrototype> = [
  SongController
];

const app = new App();
const activeControllers = ACTIVE_CONTROLLERS.forEach((ControllerClass: ControllerPrototype) => {
  const controller = new ControllerClass();
  app.addController(controller);
});