import chalk from 'chalk';
import { Server } from 'socket.io';
import { Database } from './Database';

interface packet {
  uuid: string;
  measurement: number;
  pointName: string;
}

export class ServerSocket {
  private io!: Server;

  constructor(
    private path: string,
    private port: number,
    private eventName: string,
    private database: Database
  ) {
    this.initSocket();
    this.connStatus();
  }

  private initSocket(): void {
    this.io = new Server(this.port, {
      path: this.path,
      transports: ['websocket'],
    });
    console.log(chalk.yellow('Initialized server...'));
  }

  private connStatus(): void {
    this.io.on('connect', (socket) => {
      console.log(chalk.green('Client connected!'));

      socket.on('disconnect', () => {
        console.log(chalk.red('Client disconected!'));
      });

      socket.on(this.eventName, (data: packet) => {
        const { uuid, measurement, pointName } = data;
        this.database.write(uuid, measurement, pointName);
      });
    });
  }

  closeSocket(): void {
    console.log(chalk.red('Closing socket...'));
    this.database.closeWrite();
    this.io.close();
  }
}
