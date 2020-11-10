import chalk from 'chalk';
import io from 'socket.io-client';

export class ClientSocket {
  private socket!: SocketIOClient.Socket;

  constructor(private port: number, private path: string) {
    this.initSocket();
    this.connStatus();
  }

  private initSocket() {
    this.socket = io(`http://localhost:${this.port}${this.path}`);
    console.log(chalk.yellow('Initialized socket...'));
  }

  private connStatus() {
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

  closeConn() {
    console.log(chalk.yellow('Closing socket...'));
    this.socket.disconnect();
  }

  sendTemp(temp: number) {
    this.socket.emit('temp', temp, (data: string) => {
      console.log(data);
    });
  }
}
