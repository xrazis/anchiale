import { InfluxDB, QueryApi } from '@influxdata/influxdb-client';

export class Query {
  private client!: InfluxDB;
  private queryApi!: QueryApi;

  constructor() {
    this.initDatabase();
  }

  private initDatabase(): void {
    this.client = new InfluxDB({
      url: process.env.VUE_APP_DB_URL!,
      token: process.env.VUE_APP_DB_TOKEN!,
    });
    this.queryApi = this.client.getQueryApi(process.env.VUE_APP_DB_ORG!);
  }

  async query(filter: string) {
    const query = `from(bucket: "${process.env.VUE_APP_DB_BUCKET}") |> range(start: -1h) |> filter(fn: (r) => r._measurement == "${filter}") |> aggregateWindow(every: 10m, fn: mean)`;

    try {
      const data = await this.queryApi.collectRows(query);
      console.log('\nCollect ROWS SUCCESS');
      return data;
    } catch (error) {
      console.error(error);
      console.log('\nCollect ROWS ERROR');
      return [{ Error: 'Error occured' }];
    }
  }
}
