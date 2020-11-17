import {
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client';
import chalk from 'chalk';

export class Database {
  private client!: InfluxDB;
  private writeApi!: WriteApi;
  private queryApi!: QueryApi;

  constructor() {
    this.initDatabase();
  }

  private initDatabase(): void {
    this.client = new InfluxDB({
      url: process.env.DB_URL!,
      token: process.env.DB_TOKEN!,
    });
    this.writeApi = this.client.getWriteApi(
      process.env.DB_ORG!,
      process.env.DB_BUCKET!
    );
    this.queryApi = this.client.getQueryApi(process.env.DB_ORG!);
    console.log(chalk.yellow('Initialized Database connection...'));
  }

  write(uuid: string, measurement: number, pointName: string): void {
    const point = new Point(pointName)
      .tag('client', uuid)
      .floatField('value', measurement);
    this.writeApi.writePoint(point);
    this.writeApi.flush();
  }

  closeWrite(): void {
    this.writeApi
      .close()
      .then(() => {
        console.log(chalk.magenta('Write finished'));
      })
      .catch((e) => {
        console.error(e);
        console.log(chalk.red('Write ERROR'));
      });
  }

  query(filter: string): void {
    const query = `from(bucket: "${process.env.DB_BUCKET}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${filter}")`;

    this.queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        console.log(
          chalk.cyan(
            `On ${o._time} took ${o._measurement} of ${o._field}=${o._value}`
          )
        );
      },
      error(error) {
        console.error(error);
        console.log(chalk.red('Query ERROR'));
      },
      complete() {
        console.log(chalk.magenta('Query finished'));
      },
    });
  }
}
