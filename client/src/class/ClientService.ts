import { ClientSocket } from './ClientSocket';
import { Sensor } from './Sensor';

export class ClientService {
  private clientSocket: ClientSocket = new ClientSocket(
    'http://localhost:3000/',
    'temp'
  );
  private sensor: Sensor = new Sensor();

  constructor(public uuid: string) {}

  tempService(): void {
    setInterval(() => {
      this.clientSocket.sendTemp(this.uuid, this.sensor.takeMeasure);
    }, 1000);
  }

  tempTestService(): void {
    setInterval(() => {
      this.clientSocket.sendTemp(this.uuid, this.sensor.takeTestMeasure);
    }, 1000);
  }
}
