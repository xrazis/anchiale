import chalk from 'chalk';

interface database {
  write(uuid: string, measurement: number, pointName: string): void;
  closeWrite(): void;
}

interface packet {
  uuid: string;
  measurement: number;
  pointName: string;
}

export class Socket<T> {
  private io!: SocketIO.Server;

  constructor(
    private eventName: string,
    private server: T,
    private database: database
  ) {
    this.initSocket();
    this.initConn();
  }

  private initSocket(): void {
    this.io = require('socket.io')(this.server);
    console.log(chalk.yellow('Initialized Socket...'));
  }

  private initConn(): void {
    this.io.on('connect', (socket: SocketIO.Socket) => {
      console.log(chalk.green('Client connected!'));

      socket.on('subscribe', (room) => {
        socket.join(room);
        console.log(
          chalk.magenta(`Client ${socket.id} joined room "${room}". `)
        );
      });

      socket.on('disconnect', () => {
        console.log(chalk.red('Client disconected!'));
      });

      socket.on(this.eventName, (data: packet) => {
        const { measurement, pointName } = data;
        this.database.write(socket.id, measurement, pointName);
      });
    });
  }

  get rooms() {
    return this.io.sockets.adapter.rooms;
  }

  closeSocket(): void {
    console.log(chalk.red('Closing socket...'));
    this.database.closeWrite();
    this.io.close();
  }
}
