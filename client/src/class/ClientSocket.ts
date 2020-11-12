import chalk from 'chalk';
import io from 'socket.io-client';

export class ClientSocket {
  private socket!: SocketIOClient.Socket;

  constructor(private path: string, private eventName: string) {
    this.initSocket();
    this.connStatus();
  }

  private initSocket(): void {
    this.socket = io(this.path, { transports: ['websocket'] });
    console.log(chalk.yellow('Initialized socket...'));
  }

  private connStatus(): void {
    this.socket.on('connect', () => {
      console.log(chalk.green('Connected to server!'));
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log(chalk.red('Lost connection!'));

      if (reason === 'io server disconnect') {
        this.socket.connect();
      }

      console.log(chalk.yellow('Reconecting...'));
    });
  }

  closeConn(): void {
    console.log(chalk.yellow('Closing socket...'));
    this.socket.disconnect();
  }

  sendTemp(uuid: string, temp: number): void {
    this.socket.emit(this.eventName, { uuid, temp });
  }
}
