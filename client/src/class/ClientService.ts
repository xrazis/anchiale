import { ClientSocket } from './ClientSocket';
import { Sensor } from './Sensor';

export class ClientService {
  private clientSocket: ClientSocket = new ClientSocket(
    process.env.SERVER_URL!,
    'temp'
  );
  private sensor: Sensor = new Sensor();

  constructor() {}

  tempService(): void {
    setInterval(() => {
      this.clientSocket.sendTemp(this.sensor.takeMeasure, 'temperature');
    }, 5 * 60000);
  }

  tempTestService(): void {
    setInterval(() => {
      this.clientSocket.sendTemp(this.sensor.takeTestMeasure, 'temperature');
    }, 5 * 60000);
  }
}
