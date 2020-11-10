import chalk from 'chalk';
import { Server } from 'socket.io';

interface DatabaseHas {
  push(temp: number): void;
}

export class ServerSocket<T extends DatabaseHas> {
  private io!: Server;

  constructor(private path: string, private port: number, private database: T) {
    this.initSocket();
    this.connStatus();
  }

  private initSocket() {
    this.io = new Server(this.port, {
      path: this.path,
    });
    console.log(chalk.yellow('Initialized server...'));
  }

  private connStatus() {
    this.io.on('connect', (socket) => {
      console.log(chalk.green('Client connected!'));

      socket.on('disconnect', () => {
        console.log(chalk.red('Client disconected!'));
      });

      socket.on('temp', (temp: number) => {
        this.database.push(temp);
      });
    });
  }

  closeSocket() {
    this.io.close(() => {
      console.log(chalk.red('Closing socket...'));
    });
  }
}
