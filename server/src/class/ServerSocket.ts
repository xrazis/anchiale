import chalk from 'chalk';
import { Server } from 'socket.io';
import { Database } from './Database';

interface packet {
  uuid: string;
  temp: number;
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
        const { uuid, temp } = data;
        this.database.write(uuid, temp);
      });
    });
  }

  closeSocket(): void {
    console.log(chalk.red('Closing socket...'));
    this.database.closeWrite();
    this.io.close();
  }
}
