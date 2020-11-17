import * as express from 'express';
import { Service } from '../class/Service';

export class Routes {
  constructor(public app: express.Application, public service: Service) {
    this.app = app;
    this.setStaticDir();
  }

  setStaticDir() {}

  private devices(): void {
    this.app.get('/devices', async (req, res) => {
      const data = this.service.socket.rooms;
      console.log(data);
      const parsedOata = JSON.stringify(data);
      res.header('Content-Type', 'application/json');
      res.send(parsedOata);
    });
  }

  public routes(): void {
    this.devices();
  }
}
