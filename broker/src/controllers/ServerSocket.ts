import chalk from 'chalk';
import { Server } from 'socket.io';

export class ServerSocket {
  private io!: Server;

  constructor(private path: string, private port: number) {
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
      console.log(chalk.magenta('Client connected!'));

      socket.on('disconnect', () => {
        console.log(chalk.red('Client disconected!'));
      });
    });
  }
}
