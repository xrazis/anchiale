import { ClientSocket } from './ClientSocket';
import { Sensor } from './Sensor';

export class ClientService {
  clientSocket: ClientSocket = new ClientSocket(3000, '/');
  sensor: Sensor = new Sensor();

  constructor() {}

  tempService() {
    setInterval(() => {
      this.clientSocket.sendTemp(this.sensor.takeMeasure);
    }, 1000);
  }

  tempTestService() {
    setInterval(() => {
      this.clientSocket.sendTemp(this.sensor.takeTestMeasure);
    }, 1000);
  }
}
