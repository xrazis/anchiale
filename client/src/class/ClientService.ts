import { ClientSocket } from './ClientSocket';
import { Sensor } from './Sensor';

export class ClientService {
  private clientSocket: ClientSocket = new ClientSocket(
    process.env.SERVER_URL!,
    'temp'
  );
  private sensor: Sensor = new Sensor();

  constructor(public uuid: string) {}

  tempService(): void {
    setInterval(() => {
      this.clientSocket.sendTemp(
        this.uuid,
        this.sensor.takeMeasure,
        'temperature'
      );
    }, 3000);
  }

  tempTestService(): void {
    setInterval(() => {
      this.clientSocket.sendTemp(
        this.uuid,
        this.sensor.takeTestMeasure,
        'temperature'
      );
    }, 3000);
  }
}
