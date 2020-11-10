import { Database } from './Database';
import { ServerSocket } from './ServerSocket';

export class ServerService {
  private database: Database = new Database();
  private serverSocket: ServerSocket = new ServerSocket(
    '/',
    3000,
    'temp',
    this.database
  );

  constructor() {
    // this.database.query('temperature');
  }
}
