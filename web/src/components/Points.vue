<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Points
    </p>
    <div class="panel-block">
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-success is-outlined" v-on:click="getData">
            Fetch Data
          </button>
        </p>
        <p class="control">
          <button
            class="button is-success is-outlined"
            v-on:click="createChart"
          >
            Create Chart
          </button>
        </p>
        <p class="control">
          <button
            class="button is-success is-outlined"
            v-on:click="createTable"
          >
            Create Table
          </button>
        </p>
        <p class="control">
          <button class="button is-outlined" v-on:click="clearData">
            Clear
          </button>
        </p>
      </div>
    </div>
    <div v-if="isChart">
      <canvas id="chart"></canvas>
    </div>
    <div v-if="isTable">
      <table
        class="table 
        table is-striped
        table is-hoverable
        has-text-left
        table is-fullwidth"
      >
        <thead>
          <tr>
            <th><abbr title="Device">Device id</abbr></th>
            <th><abbr title="Time">Time</abbr></th>
            <th><abbr title="Temp">Measurement</abbr></th>
          </tr>
        </thead>
        <tr v-for="(point, index) in points" :key="index">
          <td class="is-family-monospace">{{ point.client }}</td>
          <td>{{ new Date(point.time).toLocaleString() }}</td>
          <td>{{ point.value }}°C</td>
        </tr>
      </table>
    </div>
    <div v-else-if="hasData">
      <span class="panel-block"
        >Fetched data, try creating a chart or table!</span
      >
    </div>
    <div v-else-if="error">
      <span class="panel-block">{{ error }}</span>
    </div>
    <div v-else>
      <span class="panel-block">No data yet, try fetching!</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';
import Chart from 'chart.js';
import ChartFormat from '../class/ChartFormat';

export default class Points extends Vue {
  private error = '';
  private isChart = false;
  private isTable = false;
  private hasData = false;
  private points = [];
  private formatedPoints = [];
  private clients: Array<string> = [];

  getData() {
    axios
      .get(`${process.env.VUE_APP_SERVER_URL}/measurements`)
      .then((response) => {
        this.hasData = true;
        this.points = response.data;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  clearData() {
    this.isChart = false;
    this.isTable = false;
  }

  getClient() {
    axios
      .get(`${process.env.VUE_APP_SERVER_URL}/devices`)
      .then((response) => {
        this.clients = response.data;
      })
      .catch((error) => {
        this.error = error.message;
      });
  }

  createChart() {
    const formatedData = new ChartFormat(this.points);
    this.isTable = false;
    this.isChart = true;
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '-60m',
          '-55m',
          '-50m',
          '-45m',
          '-40m',
          '-35m',
          '-30m',
          '-25m',
          '-20m',
          '-15m',
          '-10m',
          '-5m',
        ],
        datasets: [
          {
            // one line graph
            label: 'Number of Moons',
            data: [0, 0, 1, 2, 37, 42, 27, 14, null, 10, 10, 55],

            borderColor: [
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
              '#36495d',
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 5,
                max: 60,
              },
            },
          ],
        },
      },
    });
  }

  createTable() {
    this.isChart = false;
    this.isTable = true;
  }
}
</script>
