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
      const data = await this.service.socket.rooms;
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    });
  }

  public routes(): void {
    this.devices();
  }
}
