import {
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client';
import chalk from 'chalk';
import { url, token, org, bucket } from '../config/creds';

export class Database {
  private client!: InfluxDB;
  private writeApi!: WriteApi;
  private queryApi!: QueryApi;

  constructor() {
    this.initDatabase();
  }

  private initDatabase(): void {
    this.client = new InfluxDB({ url: url, token: token });
    this.writeApi = this.client.getWriteApi(org, bucket);
    this.writeApi.useDefaultTags({ host: 'local' });
    this.queryApi = this.client.getQueryApi(org);
  }

  write(uuid: string, temp: number) {
    const point = new Point('temperature')
      .tag('client', uuid)
      .floatField('value', temp);
    this.writeApi.writePoint(point);
    this.writeApi.flush();
  }

  closeWrite() {
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

  query(filter: string) {
    const query = `from(bucket: "${bucket}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${filter}")`;

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
